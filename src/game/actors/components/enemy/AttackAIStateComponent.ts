import {EnemyAIStateComponent} from "./EnemyAIStateComponent";
import Actor from "../../Actor";
import {EnemyAIState} from "../../../enums/EnemyAIState";
import Animation from "../../../graphics/Animation";
import {ActorRenderComponent} from "../RenderComponent";
import AnimationComponent, {AnimationObserver} from "../AnimationComponent";
import PositionComponent from "../PositionComponent";
import Frame from "../../../graphics/Frame";
import {Sounds} from "../../../enums/Sounds";
import EventMgr from "../../../events/EventMgr";
import EventData_Request_Play_Sound from "../../../events/EventData_Request_Play_Sound";
import EnemyAIComponent from "./EnemyAIComponent";
import GamePhysics, {ActorFixtureDef} from "../../../GamePhysics";
import {FixtureType} from "../../../enums/FixtureType";
import Point from "../../../utils/Point";

export default class AttackAIStateComponent extends EnemyAIStateComponent implements AnimationObserver {
    public static NAME = 'AttackAIStateComponent';

    enemyList: Actor[] = [];
    anim: Animation;
    frameAttackIndex: number;
    agroSounds: Sounds[] = [];
    attackSound: Sounds | undefined;
    positionComponent: PositionComponent;
    animationComponent: AnimationComponent;
    renderComponent: ActorRenderComponent;
    enemyAIComponent: EnemyAIComponent;

    constructor(owner: Actor, anim: Animation, frameAttackIndex: number, positionComponent: PositionComponent,
                animationComponent: AnimationComponent, renderComponent: ActorRenderComponent,
                enemyAIComponent: EnemyAIComponent, physics: GamePhysics,
                agroSounds: Sounds[] = [], attackSound: Sounds | undefined = undefined,
                areaRadius = 60) {
        super(owner, false, 10);
        this.anim = anim;
        this.frameAttackIndex = frameAttackIndex;
        this.positionComponent = positionComponent;
        this.renderComponent = renderComponent;
        this.animationComponent = animationComponent;
        this.enemyAIComponent = enemyAIComponent;
        this.agroSounds = agroSounds;
        this.attackSound = attackSound;
        animationComponent.animationObservers.push(this);
        enemyAIComponent.states.push(this);
        const ownerBody = physics.actorBodies.get(owner);
        if (ownerBody) {
            const fixDef = new ActorFixtureDef();
            fixDef.isSensor = true;
            fixDef.fixtureType = FixtureType.FixtureType_EnemyAIMeleeSensor;
            fixDef.size = new Point(areaRadius * 2, areaRadius);
            physics.AddActorFixtureToBody(ownerBody, fixDef);
        } else {
            console.error('Body for owner was not found. Init PhysicsComponent first???');
        }
    }

    VCanEnter(): boolean {
        if (this.enemyList.length < 1) {
            return false;
        }

        // TODO: Check if enemy is within line of sight
        // Point fromPoint = m_pOwner->GetPositionComponent()->GetPosition();
        // Point toPoint = m_EnemyAgroList[0]->GetPositionComponent()->GetPosition();
        //
        // RaycastResult raycastResult = g_pApp->GetGameLogic()->VGetGamePhysics()->VRayCast(
        //     fromPoint,
        //     toPoint,
        //     CollisionFlag_Solid);
        // if (raycastResult.foundIntersection)
        // {
        //     // Vision is obstructed
        //     return false;
        // }

        return true;
    }

    VGetStateType() {
        return EnemyAIState.EnemyAIState_MeleeAttacking;
    }

    VOnStateEnter(pPreviousState: EnemyAIStateComponent) {
        this.isActive = true;
        this.VExecuteAttack();
    }

    VOnStateLeave(pNextState: EnemyAIStateComponent) {
        this.isActive = false;
    }

    private VExecuteAttack() {
        if (!this.isActive) {
            return;
        }
        const closestEnemyOffset = this.FindClosestHostileActorOffset();
        if (closestEnemyOffset < 0) {
            this.renderComponent.mirror = false;
        } else {
            this.renderComponent.mirror = true;
        }
        this.animationComponent.setAnimation(this.anim);
    }

    private FindClosestHostileActorOffset() {
        if (this.enemyList.length > 0) {
            const positionComponent = this.enemyList[0].getComponent(PositionComponent.NAME) as PositionComponent;
            if (positionComponent) {
                return positionComponent.position.x - this.positionComponent.position.x;
            }
        }
        return 0;
    }

    VOnAnimationFrameChanged(animation: Animation, oldFrame: Frame, currentFrame: Frame) {
        if (!this.isActive) {
            return;
        }

        if (animation.name === this.anim.name && this.anim.frames[this.frameAttackIndex] === currentFrame) {
            //std::shared_ptr<EnemyAttackAction> pAttack = m_AttackActions[m_CurrentAttackActionIdx];

            // const dir = Direction.Direction_Left;
            // const offset = pAttack->attackSpawnPositionOffset;
            // if (m_pRenderComponent->IsMirrored())
            // {
            //     dir = Direction_Right;
            //     offset = Point(offset.x * -1.0, offset.y);
            // }

            this.VOnAttackFrame(/*pAttack, dir, offset*/);

            if (this.attackSound !== undefined) {
                EventMgr.getInstance().VTriggerEvent(new EventData_Request_Play_Sound(this.attackSound));
            }
        }
    }

    VOnAnimationLooped(animation: Animation) {
        if (!this.isActive) {
            return;
        }

        if (animation.name === this.anim.name) {
            this.enemyAIComponent.EnterBestState(true);
            if (this.isActive) {
                this.VExecuteAttack();
            }
        } else {
            this.VExecuteAttack();
        }
    }

    private VOnAttackFrame() {
        // TODO: attack logic
        // ActorTemplates::CreateAreaDamage(
        //     m_pPositionComponent->GetPosition() + offset,
        //     pAttack->attackAreaSize,
        //     pAttack->damage,
        //     CollisionFlag_EnemyAIAttack,
        //     "Rectangle",
        //     DamageType_MeleeAttack,
        //     dir,
        //     m_pOwner->GetGUID());
    }

    OnEnemyEnterAgroRange(pEnemy: Actor) {
        this.enemyList.push(pEnemy);

        const isPrevState = this.isActive;
        this.enemyAIComponent.EnterBestState(false);

        if (!isPrevState && this.isActive) {
            if (this.agroSounds.length > 0) {
                const index = Math.round(Math.random() * 100) % this.agroSounds.length;
                EventMgr.getInstance().VTriggerEvent(new EventData_Request_Play_Sound(this.agroSounds[index]));
            }
        }
    }

    OnEnemyLeftAgroRange(pEnemy: Actor) {
        const index = this.enemyList.findIndex((a) => a === pEnemy);
        if (index >= 0) {
            this.enemyList.splice(index, 1);
        } else {
            console.error('Claw was not found in agro list!!!');
        }
    }

    getName() {
        return AttackAIStateComponent.NAME;
    }
}
