import {IEventData} from "./IEventData";
import Point from "../utils/Point";
import Actor from "../actors/Actor";

export default class EventData_Actor_Start_Move implements IEventData {
    public static readonly NAME = 'EventData_Actor_Start_Move';

    constructor(public actor: Actor, public move: Point) {
    }

    getName(): string {
        return EventData_Actor_Start_Move.NAME;
    }
}
