import {IEventData} from "./IEventData";
import Point from "../utils/Point";
import Actor from "../actors/Actor";

export default class EventData_Actor_Start_Move extends IEventData {
    public static readonly NAME = 'EventData_Actor_Start_Move';

    constructor(public actor: Actor, public move: Point) {
        super();
    }

    getName(): string {
        return EventData_Actor_Start_Move.NAME;
    }

    equals(e: IEventData): boolean {
        return super.equals(e) || (this.getName() === e.getName() && this.actor === (e as EventData_Actor_Start_Move).actor);
    }
}
