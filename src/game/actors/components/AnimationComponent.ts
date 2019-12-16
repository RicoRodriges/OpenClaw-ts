import ActorComponent from "../ActorComponent";
import Actor from "../Actor";
import Animation from "../../graphics/Animation";
import {ActorRenderComponent} from "./RenderComponent";
import Frame from "../../graphics/Frame";

export default class AnimationComponent extends ActorComponent {
    public static NAME = 'AnimationComponent';
    public animationObservers: AnimationObserver[] = [];
    time: number;

    constructor(owner: Actor, private renderComponent: ActorRenderComponent,
                public anim: Animation, public current = 0) {
        super(owner);
        this.renderComponent.setCurrentImage(this.anim.frames[0].image);
        this.time = 0;
    }

    VUpdate(diff: number) {
        if (this.renderComponent) {
            if (this.anim.frames.length === 1) {
                this.renderComponent.setCurrentImage(this.anim.frames[0].image);
            } else {
                this.time += diff;
                const oldFrame = this.anim.frames[this.current];
                if (this.time >= oldFrame.delay) {
                    this.time = 0;
                    const newCurrent = (this.current + 1) % this.anim.frames.length;
                    this.current = newCurrent;
                    const currentFrame = this.anim.frames[this.current];
                    this.VOnAnimationFrameChanged(this.anim, oldFrame, currentFrame);
                    this.renderComponent.setCurrentImage(this.anim.frames[this.current].image);
                    if (newCurrent === 0) {
                        this.VOnAnimationLooped(this.anim);
                    }
                }
            }
        }
    }

    setAnimation(anim: Animation) {
        if (anim.name !== this.anim.name) {
            this.time = 0;
            this.current = 0;
            this.anim = anim;
            this.renderComponent.setCurrentImage(this.anim.frames[this.current].image);
        }
    }

    getName(): string {
        return AnimationComponent.NAME;
    }

    GetCurrentAnimationName() {
        return this.anim.name;
    }

    VOnAnimationFrameChanged(animation: Animation, oldFrame: Frame, currentFrame: Frame): void {
        this.animationObservers.forEach((obs) => obs.VOnAnimationFrameChanged(animation, oldFrame, currentFrame));
    }

    VOnAnimationLooped(animation: Animation): void {
        this.animationObservers.forEach((obs) => obs.VOnAnimationLooped(animation));
    }
}

export interface AnimationObserver {
    VOnAnimationFrameChanged(animation: Animation, oldFrame: Frame, currentFrame: Frame): void;
    VOnAnimationLooped(animation: Animation): void;
}
