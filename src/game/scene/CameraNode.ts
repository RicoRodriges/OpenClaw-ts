import SceneNode from "./SceneNode";
import Rect from "../utils/Rect";
import Actor from "../actors/Actor";
import Scene from "./Scene";

export default class CameraNode extends SceneNode {
    actor: Actor | null;
    followByActor = true;

    constructor(public x: number, public y: number, public w: number, public h: number, follow: Actor | null = null) {
        super();
        this.actor = follow;
    }

    getCameraRect(scene: Scene): Rect {
        if (this.followByActor && this.actor) {
            const actorNode = scene.actorNodes.get(this.actor);
            if (actorNode) {
                this.x = actorNode.properties.position.x - this.w / 2;
                this.y = actorNode.properties.position.y - this.h / 2;
            }
        }
        // if (this.actor) {
        //     const actorNode = scene.actorNodes.get(this.actor);
        //     if (actorNode) {
        //         console.log(actorNode.properties.position.x - this.w / 2, actorNode.properties.position.y - this.h / 2);
        //     }
        // }
        return new Rect(Math.floor(this.x), Math.floor(this.y), this.w, this.h);
    }

}
