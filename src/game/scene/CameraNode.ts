import SceneNode from "./SceneNode";
import Rect from "../utils/Rect";
import Actor from "../actors/Actor";
import Scene from "./Scene";

export default class CameraNode extends SceneNode {
    actor: Actor | null;
    followByActor = true;
    actorNode: SceneNode | null = null;

    constructor(public x: number, public y: number, public w: number, public h: number, follow: Actor | null = null) {
        super();
        this.actor = follow;
    }

    getCameraRect(scene: Scene): Rect {
        if (this.followByActor && this.actor) {
            if (this.actorNode === null) {
                this.resolveActorNode(scene, this.actor);
            }
            if (this.actorNode !== null) {
                this.x = this.actorNode.properties.position.x - this.w / 2;
                this.y = this.actorNode.properties.position.y - this.h / 2;
            }
        }
        // if (this.actor) {
        //     const actorNode = scene.actorNodes.get(this.actor);
        //     if (actorNode) {
        //         console.log(actorNode.properties.position.x - this.w / 2, actorNode.properties.position.y - this.h / 2);
        //     }
        // }
        return new Rect(~~(this.x), ~~(this.y), this.w, this.h);
    }

    private resolveActorNode(scene: Scene, a: Actor) {
        const actorNode = scene.actorNodes.get(a);
        if (actorNode) {
            this.actorNode = actorNode;
        }
    }

}
