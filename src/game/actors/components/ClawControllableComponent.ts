import ActorComponent from "../ActorComponent";
import AnimationComponent from "./AnimationComponent";
import ResourceMgr from "../../ResourceMgr";
import Actor from "../Actor";
import GameProperties from "../../GameProperties";
import {Direction} from "../../enums/Direction";
import {ClawState} from "../../enums/ClawState";
import {ActorRenderComponent} from "./RenderComponent";
import {Animations} from "../../enums/Animations";

export default class ClawControllableComponent extends ActorComponent {
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
            this.state === ClawState.ClawState_JumpAttacking)
        {
            return;
        }

        this.setAnimation(Animations.fall);
        this.state = ClawState.ClawState_Falling;
    }

    VOnLandOnGround(fromHeight: number) {
        this.setAnimation(Animations.idle);
        this.state = ClawState.ClawState_Standing;
    }
}
