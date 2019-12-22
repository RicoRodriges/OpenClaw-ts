import Point from "../utils/Point";
import Actor from "../actors/Actor";

export default class SceneNodeProperties {
    actor: Actor | null;
    position: Point;

    constructor(actor: Actor | null, x: number, y: number) {
        this.actor = actor;
        this.position = new Point(x, y);
    }
}
