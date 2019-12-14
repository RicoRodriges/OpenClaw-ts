import ActorComponent from "../ActorComponent";
import Actor from "../Actor";
import AnimationComponent, {AnimationObserver} from "./AnimationComponent";
import HealthComponent, {HealthObserver} from "./HealthComponent";
import {DamageType} from "../../enums/DamageType";
import Frame from "../../graphics/Frame";
import EventData_Request_Delete_Actor from "../../events/EventData_Request_Delete_Actor";
import EventMgr from "../../events/EventMgr";
import GamePhysics from "../../GamePhysics";
import {Animations} from "../../enums/Animations";
import {Sounds} from "../../enums/Sounds";
import Animation from "../../graphics/Animation";
import {popRandomItem} from "../../utils/Util";
import EventData_Request_Play_Sound from "../../events/EventData_Request_Play_Sound";
import ResourceMgr from "../../ResourceMgr";

export default class DestroyableComponent extends ActorComponent implements AnimationObserver, HealthObserver {
    public static NAME = 'DestroyableComponent';

    isDead = false;

    constructor(owner: Actor, private animationComponent: AnimationComponent, healthComponent: HealthComponent,
                private physics: GamePhysics,
                private destroySounds: Sounds[] = [],
                private destroyAnim: Animations | null = null) {
        super(owner);
        animationComponent.animationObservers.push(this);
        healthComponent.observers.push(this);
    }

    VOnAnimationFrameChanged(animation: Animation, oldFrame: Frame, currentFrame: Frame) {
    }

    VOnAnimationLooped(animation: Animation) {
        if (!this.isDead || !this.destroyAnim) {
            return;
        }

        if (animation.name === this.destroyAnim) {
            this.DeleteActor();
        }
    }

    VOnHealthBelowZero(damageType: DamageType, sourceActor: Actor) {
        this.isDead = true;

        this.physics.VRemoveActor(this.owner);

        if (this.destroySounds.length > 0) {
            const sound = popRandomItem(this.destroySounds);
            if (sound) {
                EventMgr.getInstance().VQueueEvent(new EventData_Request_Play_Sound(sound));
            }
        }

        if (this.destroyAnim) {
            const anim = ResourceMgr.getInstance().getAnimation(this.destroyAnim);
            if (anim) {
                this.animationComponent.setAnimation(anim);
            } else {
                this.DeleteActor();
            }
        } else {
            this.DeleteActor();
        }
    }

    VOnHealthChanged(oldHealth: number, newHealth: number, damageType: DamageType, sourceActor: Actor) {
    }

    private DeleteActor() {
        EventMgr.getInstance().VQueueEvent(new EventData_Request_Delete_Actor(this.owner));
    }

    getName() {
        return DestroyableComponent.NAME;
    }

}
