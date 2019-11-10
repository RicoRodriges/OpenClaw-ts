import {IEventData} from "./IEventData";
import Point from "../utils/Point";
import Actor from "../actors/Actor";

export default class EventData_Move_Actor extends IEventData {
    static NAME = 'EventData_Move_Actor';

    constructor(public actor: Actor, public position: Point) {
        super();
    }

    getName(): string {
        return EventData_Move_Actor.NAME;
    }


    equals(e: IEventData): boolean {
        return super.equals(e) || (this.getName() === e.getName() && this.actor === (e as EventData_Move_Actor).actor);
    }
}
