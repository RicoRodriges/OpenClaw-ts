import ActorComponent from "../ActorComponent";
import Actor from "../Actor";
import Animation from "../../graphics/Animation";
import {ActorRenderComponent} from "./RenderComponent";

export default class AnimationComponent extends ActorComponent {
    public static NAME = 'AnimationComponent';
    time: number;

    constructor(owner: Actor, public anim: Animation, public current = 0) {
        super(owner);
        this.time = 0;
    }

    VUpdate(diff: number) {
        const renderComponent = this.owner.getComponent(ActorRenderComponent.NAME) as ActorRenderComponent;
        if (renderComponent) {
            if (this.anim.frames.length === 1) {
                renderComponent.setCurrentImage(this.anim.frames[0].image);
            } else {
                this.time += diff;
                if (this.time >= this.anim.frames[this.current].delay) {
                    this.time = 0;
                    this.current = (this.current + 1) % this.anim.frames.length;
                    renderComponent.setCurrentImage(this.anim.frames[this.current].image);
                }
            }
        }
    }

    setAnimation(anim: Animation) {
        if (anim.name !== this.anim.name) {
            this.time = 0;
            this.current = 0;
            this.anim = anim;
        }
    }

    getName(): string {
        return AnimationComponent.NAME;
    }

}
