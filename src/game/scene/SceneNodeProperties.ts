import Point from "../utils/Point";
import Actor from "../actors/Actor";

export default class SceneNodeProperties {
    actor: Actor | null;
    position: Point;
    size: Point;

    constructor(actor: Actor | null, x: number, y: number, w: number, h: number) {
        this.actor = actor;
        this.position = new Point(x, y);
        this.size = new Point(w, h);
    }
}
