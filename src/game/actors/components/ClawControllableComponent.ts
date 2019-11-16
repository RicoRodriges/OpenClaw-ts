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

export default class ClawControllableComponent extends ActorComponent implements AnimationObserver {
    public static NAME = 'ClawControllableComponent';
    state = ClawState.ClawState_Falling;
    frozen = false;
    animationComponent: AnimationComponent | null;
    renderComponent: ActorRenderComponent | null;
    direction = Direction.Direction_Right;
    takeDamageTimeLeft = 0;

    constructor(owner: Actor, animationComponent: AnimationComponent, renderComponent: ActorRenderComponent) {
        super(owner);
        this.animationComponent = animationComponent;
        this.renderComponent = renderComponent;
    }

    VUpdate(diff: number) {
        // Check if invulnerability caused by previously taking damage is gone
        if (this.takeDamageTimeLeft > 0) {
            this.takeDamageTimeLeft -= diff;
            if (this.takeDamageTimeLeft <= 0) {
                // TODO!!!!!!!!
                //m_pHealthComponent->SetInvulnerable(false);
                this.takeDamageTimeLeft = 0;
            }
        }
    }

    private setAnimation(name: string) {
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
                // Todo: attack logic
                // if (pAnimation->GetCurrentAnimationFrame()->hasEvent ||
                // (animName == "swipe" && pNewFrame->idx == 3))
                //     {
                //         Point position = m_pPositionComponent->GetPosition();
                //         Point positionOffset(60, 20);
                //         if (animName == "jumpswipe")
                //         {
                //             positionOffset.y -= 10;
                //             positionOffset.x += 5;
                //         }
                //         if (m_Direction == Direction_Left)
                //         {
                //             positionOffset = Point(-1.0 * positionOffset.x, positionOffset.y);
                //         }
                //         position += positionOffset;
                //
                //
                //             int damage = 10;
                //
                //             // When Claw is ducking he deals 1/2 damage
                //             if (IsDucking())
                //             {
                //                 damage = 5;
                //             }
                //             if (m_pPowerupComponent->HasPowerup(PowerupType_Catnip))
                //             {
                //                 damage = 100;
                //             }
                //
                //             ActorTemplates::CreateAreaDamage(
                //             position,
                //             Point(50, 25),
                //             damage,
                //             CollisionFlag_ClawAttack,
                //             "Rectangle",
                //             DamageType_MeleeAttack,
                //             m_Direction,
                //             m_pOwner->GetGUID());
                //     }
            }
        }
    }

    VOnAnimationLooped(animation: Animation) {
        if (animation.name === Animations.damage1 || animation.name === Animations.damage2) {
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
        return this.state == ClawState.ClawState_Shooting ||
            this.state == ClawState.ClawState_JumpShooting ||
            this.state == ClawState.ClawState_DuckShooting ||
            this.state == ClawState.ClawState_Attacking ||
            this.state == ClawState.ClawState_DuckAttacking ||
            this.state == ClawState.ClawState_JumpAttacking;
    }
}
