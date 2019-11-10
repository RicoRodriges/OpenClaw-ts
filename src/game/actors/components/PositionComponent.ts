import ActorComponent from "../ActorComponent";
import Actor from "../Actor";
import Point from "../../utils/Point";

export default class PositionComponent extends ActorComponent {
    static NAME = 'PositionComponent';

    constructor(public owner: Actor, public position: Point) {
        super(owner);
    }

    getName(): string {
        return PositionComponent.NAME;
    }

}
