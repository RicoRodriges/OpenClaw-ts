import ActorComponent from "../ActorComponent";
import AnimationComponent, {AnimationObserver} from "./AnimationComponent";
import ResourceMgr from "../../ResourceMgr";
import Actor from "../Actor";
import GameProperties from "../../GameProperties";
import {Direction} from "../../enums/Direction";
import {ClawState} from "../../enums/ClawState";
import {ActorRenderComponent} from "./RenderComponent";
import {Animations} from "../../enums/Animations";
import Frame from "../../graphics/Frame";
import Animation from "../../graphics/Animation";
import PhysicsComponent from "./PhysicsComponent";
import PositionComponent from "./PositionComponent";
import Point from "../../utils/Point";
import EventMgr from "../../events/EventMgr";
import EventData_Request_Play_Sound from "../../events/EventData_Request_Play_Sound";
import {Sounds} from "../../enums/Sounds";
import {createAreaDamageActor} from "../../utils/Converters";
import {CollisionFlag} from "../../enums/CollisionFlag";
import {DamageType} from "../../enums/DamageType";
import EventData_Request_New_Actor from "../../events/EventData_Request_New_Actor";
import GamePhysics from "../../GamePhysics";
import HealthComponent, {HealthObserver} from "./HealthComponent";
import EventData_Health_Changed from "../../events/EventData_Health_Changed";
import EventData_Claw_Died from "../../events/EventData_Claw_Died";

export default class ClawControllableComponent extends ActorComponent implements AnimationObserver, HealthObserver {
    public static NAME = 'ClawControllableComponent';
    state = ClawState.ClawState_Falling;
    frozen = false;
    animationComponent: AnimationComponent | null;
    renderComponent: ActorRenderComponent | null;
    physics: GamePhysics;
    direction = Direction.Direction_Right;
    takeDamageTimeLeft = 0;

    constructor(owner: Actor, animationComponent: AnimationComponent, renderComponent: ActorRenderComponent, physics: GamePhysics,
                private healthComponent: HealthComponent, private onKillSounds: Sounds[], private soundChance = 0.4,
                private takeDamageDuration: number, private damageAnims: Animations[],
                private damageSounds: Sounds[]) {
        super(owner);
        this.animationComponent = animationComponent;
        this.renderComponent = renderComponent;
        this.physics = physics;
        animationComponent.animationObservers.push(this);
        healthComponent.observers.push(this);
    }

    VUpdate(diff: number) {
        // Check if invulnerability caused by previously taking damage is gone
        if (this.takeDamageTimeLeft > 0) {
            this.takeDamageTimeLeft -= diff;
            if (this.takeDamageTimeLeft <= 0) {
                this.healthComponent.isInvulnerable = false;
                this.takeDamageTimeLeft = 0;
            }
        }
    }

    private setAnimation(name: Animations) {
        if (this.animationComponent) {
            const anim = ResourceMgr.getInstance().getAnimation(name);
            if (anim) {
                this.animationComponent.setAnimation(anim);
            }
        }
    }

    getName(): string {
        return ClawControllableComponent.NAME;
    }

    GetMaxJumpHeight(): number {
        return GameProperties.player.maxJumpHeight
    }

    InPhysicsCapableState() {
        return this.state !== ClawState.ClawState_Dying && this.state !== ClawState.ClawState_TakingDamage;
    }

    CanMove() {
        return !(this.state === ClawState.ClawState_Shooting ||
            this.state === ClawState.ClawState_Attacking ||
            this.state === ClawState.ClawState_Dying ||
            this.state === ClawState.ClawState_DuckAttacking ||
            this.state === ClawState.ClawState_DuckShooting ||
            this.state === ClawState.ClawState_TakingDamage ||
            this.frozen);
    }

    VOnDirectionChange(direction: Direction) {
        if (this.frozen) {
            return false;
        }

        if (this.renderComponent) {
            this.renderComponent.mirror = direction === Direction.Direction_Left;
        }
        this.direction = direction;

        return true;
    }

    VOnStopMoving() {
        if (this.state === ClawState.ClawState_Shooting ||
            this.state === ClawState.ClawState_Idle/* ||
            IsDucking()*/) {
            return;
        }

        this.setAnimation(Animations.idle);
        this.state = ClawState.ClawState_Standing;
    }

    VOnRun() {
        if (this.state === ClawState.ClawState_Shooting) {
            return;
        }
        this.setAnimation(Animations.run);
        this.state = ClawState.ClawState_Walking;
    }

    VOnStartJumping() {
        if (this.state === ClawState.ClawState_JumpShooting ||
            this.state === ClawState.ClawState_JumpAttacking ||
            this.frozen) {
            return;
        }

        this.setAnimation(Animations.jump);
        this.state = ClawState.ClawState_Jumping;
    }

    VOnStartFalling() {
        if (this.state === ClawState.ClawState_JumpShooting ||
            this.state === ClawState.ClawState_JumpAttacking) {
            return;
        }

        this.setAnimation(Animations.fall);
        this.state = ClawState.ClawState_Falling;
    }

    VOnLandOnGround(fromHeight: number) {
        this.setAnimation(Animations.idle);
        this.state = ClawState.ClawState_Standing;
    }

    OnAttack() {
        if (this.IsAttackingOrShooting() ||
            this.state === ClawState.ClawState_TakingDamage ||
            this.state === ClawState.ClawState_Dying ||
            this.frozen) {
            return;
        }

        if (this.state === ClawState.ClawState_Falling ||
            this.state === ClawState.ClawState_Jumping) {
            this.setAnimation(Animations.swordAttackJump);
            this.state = ClawState.ClawState_JumpAttacking;
        } else {
            // TODO: another animations
            // int attackType = rand() % 5;
            // if (attackType == 0)
            // {
            //     m_pClawAnimationComponent->SetAnimation("kick");
            // }
            // else if (attackType == 1)
            // {
            //     m_pClawAnimationComponent->SetAnimation("uppercut");
            // }
            // else
            // {
            this.setAnimation(Animations.swordAttack);
            // }

            this.state = ClawState.ClawState_Attacking;
        }
    }

    VOnAnimationFrameChanged(animation: Animation, oldFrame: Frame, currentFrame: Frame) {
        if (this.animationComponent) {
            if (animation.name === Animations.fall) {
                if (animation.frames[0] === currentFrame) {
                    this.animationComponent.current = 1;
                }
            } else if ((animation.name === Animations.swordAttack ||
                // TODO: another animations
                // animName == "kick" ||
                // animName == "uppercut" ||
                animation.name === Animations.swordAttackJump)) {
                const positionComponent = this.owner.getComponent(PositionComponent.NAME) as PositionComponent;
                if (positionComponent && ((animation.name === Animations.swordAttack && animation.frames[2] === currentFrame) ||
                    (animation.name === Animations.swordAttackJump && animation.frames[2] === currentFrame))) {
                    let positionOffset = new Point(60, 20);
                    if (animation.name === Animations.swordAttackJump) {
                        positionOffset.y -= 10;
                        positionOffset.x += 5;
                    }
                    if (this.direction === Direction.Direction_Left) {
                        positionOffset = new Point(-1.0 * positionOffset.x, positionOffset.y);
                    }
                    const position = new Point(positionComponent.position.x + positionOffset.x, positionComponent.position.y + positionOffset.y);

                    const damage = 10;
                    const actor = createAreaDamageActor(position,
                        new Point(50, 25), damage, CollisionFlag.CollisionFlag_ClawAttack, DamageType.DamageType_MeleeAttack, this.owner,
                        this.physics, 150);
                    EventMgr.getInstance().VQueueEvent(new EventData_Request_New_Actor(actor));
                    EventMgr.getInstance().VTriggerEvent(new EventData_Request_Play_Sound(Sounds.claw_swordAttack));
                }
            }
        }
    }

    VOnAnimationLooped(animation: Animation) {
        if (this.damageAnims.find((a) => a === animation.name) !== undefined) {
            this.SetCurrentPhysicsState();
        } else if ((animation.name === Animations.swordAttack ||
            // TODO: another animations
            // animName == "kick" ||
            // animName == "uppercut" ||
            animation.name === Animations.swordAttackJump)) {
            this.SetCurrentPhysicsState();
        }
    }

    private SetCurrentPhysicsState() {
        const physicsComponent = this.owner.getComponent(PhysicsComponent.NAME) as PhysicsComponent;
        if (physicsComponent && this.animationComponent) {
            if (physicsComponent.isFalling) {
                this.setAnimation(Animations.fall);
                this.state = ClawState.ClawState_Falling;
            } else if (physicsComponent.isJumping) {
                this.setAnimation(Animations.jump);
                this.state = ClawState.ClawState_Jumping;
            } else if (physicsComponent.IsOnGround()) {
                this.setAnimation(Animations.idle);
                this.state = ClawState.ClawState_Standing;
            } else {
                this.setAnimation(Animations.fall);
                this.state = ClawState.ClawState_Standing;
            }

            physicsComponent.RestoreGravityScale();
        }
    }

    private IsAttackingOrShooting() {
        return this.state === ClawState.ClawState_Shooting ||
            this.state === ClawState.ClawState_JumpShooting ||
            this.state === ClawState.ClawState_DuckShooting ||
            this.state === ClawState.ClawState_Attacking ||
            this.state === ClawState.ClawState_DuckAttacking ||
            this.state === ClawState.ClawState_JumpAttacking;
    }

    OnClawKilledEnemy(damageType: DamageType, enemy: Actor) {
        if (this.onKillSounds.length > 0 && Math.random() < this.soundChance) {
            const i = Math.floor(Math.random() * 100) % this.onKillSounds.length;
            EventMgr.getInstance().VQueueEvent(new EventData_Request_Play_Sound(this.onKillSounds[i]));
        }
    }

    VOnHealthChanged(oldHealth: number, newHealth: number, damageType: DamageType, sourceActor: Actor): void {
        if (/*newHealth > 0 &&*/ oldHealth > newHealth) {
            if (this.damageAnims.length > 0 && this.animationComponent) {
                const i = Math.round(Math.random() * 100) % this.damageAnims.length;
                this.setAnimation(this.damageAnims[i]);
            }

            if (this.damageSounds.length > 0) {
                const i = Math.round(Math.random() * 100) % this.damageSounds.length;
                EventMgr.getInstance().VTriggerEvent(new EventData_Request_Play_Sound(this.damageSounds[i]));
            }

            this.healthComponent.isInvulnerable = true;
            this.takeDamageTimeLeft = this.takeDamageDuration;
            this.physics.VSetGravityScale(this.owner, 0);

            this.state = ClawState.ClawState_TakingDamage;
        }
        EventMgr.getInstance().VTriggerEvent(new EventData_Health_Changed(newHealth));
    }

    VOnHealthBelowZero(damageType: DamageType, sourceActor: Actor) {
        //this.healthComponent.AddHealth(100, DamageType.DamageType_None, this.owner);
        EventMgr.getInstance().VTriggerEvent(new EventData_Request_Play_Sound(Sounds.claw_death));
        EventMgr.getInstance().VTriggerEvent(new EventData_Claw_Died());
    }
}
