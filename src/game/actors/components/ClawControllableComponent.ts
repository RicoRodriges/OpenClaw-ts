import ActorComponent from "../ActorComponent";
import Point from "../../utils/Point";
import AnimationComponent from "./AnimationComponent";
import ResourceMgr from "../../ResourceMgr";
import Actor from "../Actor";

export default class ClawControllableComponent extends ActorComponent {
    public static NAME = 'ClawControllableComponent';
    velocity = new Point(0, 0);

    constructor(owner: Actor) {
        super(owner);
    }

    VUpdate(diff: number) {
        const animationComponent = this.owner.getComponent(AnimationComponent.NAME) as AnimationComponent;
        if (animationComponent) {
            if (Math.abs(this.velocity.x) > 1 || Math.abs(this.velocity.y) > 1) {
                this.setAnimation('claw_run', animationComponent)
            } else {
                this.setAnimation('claw_idle', animationComponent)
            }
        }
    }

    private setAnimation(name: string, animationComponent: AnimationComponent) {
        const anim = ResourceMgr.getInstance().getAnimation(name);
        if (anim) {
            animationComponent.setAnimation(anim);
        }
    }

    getName(): string {
        return ClawControllableComponent.NAME;
    }

}
