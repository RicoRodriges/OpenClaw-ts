import {EnemyAIStateComponent} from "./EnemyAIStateComponent";
import {EnemyAIState} from "../../../enums/EnemyAIState";
import {Direction} from "../../../enums/Direction";
import GamePhysics from "../../../GamePhysics";
import Actor from "../../Actor";
import Point from "../../../utils/Point";
import PositionComponent from "../PositionComponent";
import AnimationComponent, {AnimationObserver} from "../AnimationComponent";
import Animation from "../../../graphics/Animation";
import {ActorRenderComponent} from "../RenderComponent";
import Frame from "../../../graphics/Frame";

export default class PatrolEnemyAIStateComponent extends EnemyAIStateComponent implements AnimationObserver {
    direction = Direction.Direction_Left;
    isWalking = true;
    physics: GamePhysics;
    positionComponent: PositionComponent;
    animationComponent: AnimationComponent;
    renderComponent: ActorRenderComponent;
    leftBorder: number;
    rightBorder: number;
    speed: number;
    idle: Animation;
    run: Animation;

    constructor(owner: Actor, physics: GamePhysics, positionComponent: PositionComponent, animationComponent: AnimationComponent,
                renderComponent: ActorRenderComponent, speed: number,
                leftBorder: number, rightBorder: number, idle: Animation, run: Animation) {
        super(owner);
        this.physics = physics;
        this.positionComponent = positionComponent;
        this.animationComponent = animationComponent;
        this.renderComponent = renderComponent;
        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
        this.idle = idle;
        this.run = run;
        this.speed = Math.abs(speed);
    }

    VUpdate(diff: number) {
        if (!this.isActive) {
            return;
        }

        if (this.isWalking) {
            if (Math.abs(this.physics.VGetVelocity(this.owner).x) < 0.1) {
                this.CommenceIdleBehaviour();
            } else if ((this.positionComponent.position.x <= this.leftBorder && this.direction === Direction.Direction_Left) ||
                (this.positionComponent.position.x >= this.rightBorder && this.direction === Direction.Direction_Right)) {
                this.CommenceIdleBehaviour();
            }
        }
    }

    VCanEnter() {
        return true;
    }

    VGetStateType() {
        return EnemyAIState.EnemyAIState_Patrolling;
    }

    VOnStateEnter(pPreviousState: EnemyAIStateComponent) {
        this.isActive = true;
        this.ChangeDirection(this.direction);
    }

    VOnStateLeave(pNextState: EnemyAIStateComponent) {
        this.isActive = false;
        this.physics.VSetLinearSpeed(this.owner, new Point(0, 0));
    }

    private ChangeDirection(direction: Direction) {
        this.direction = direction;
        this.renderComponent.mirror = direction === Direction.Direction_Right;
        this.isWalking = true;
        this.animationComponent.setAnimation(this.run);

        if (direction === Direction.Direction_Left) {
            this.physics.VSetLinearSpeed(this.owner, new Point(-1.0 * this.speed, 0.0));
        } else {
            this.physics.VSetLinearSpeed(this.owner, new Point(this.speed, 0.0));
        }
    }

    private CommenceIdleBehaviour() {
        if (this.isWalking) {
            this.isWalking = false;
            this.animationComponent.setAnimation(this.idle);
            this.physics.VSetLinearSpeed(this.owner, new Point(0, 0));

            // TODO: Try to play idle sound
            // StrongActorPtr pClaw = g_pApp->GetGameLogic()->GetClawActor();
            // assert(pClaw);
            //
            // if ((m_pOwner->GetPositionComponent()->GetPosition() - pClaw->GetPositionComponent()->GetPosition()).Length() < m_IdleSpeechSoundMaxDistance)
            // {
            //     m_pEnemyAIComponent->TryPlaySpeechSound(m_IdleSpeechSoundPlayChance, m_IdleSoundList);
            // }
        }
    }

    private ToOppositeDirection(direction: Direction) {
        return direction === Direction.Direction_Left ? Direction.Direction_Right : Direction.Direction_Left;
    }

    VOnAnimationFrameChanged(animation: Animation, oldFrame: Frame, currentFrame: Frame) {
    }

    VOnAnimationLooped(animation: Animation) {
        if (!this.isActive) {
            return;
        }
        if (!this.isWalking) {
            this.ChangeDirection(this.ToOppositeDirection(this.direction));
        }
    }
}
