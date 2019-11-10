import {IEventData} from "./IEventData";
import Point from "../utils/Point";
import Actor from "../actors/Actor";

export default class EventData_Move_Actor implements IEventData {
    static NAME = 'EventData_Move_Actor';

    constructor(public actor: Actor, public position: Point) {

    }

    getName(): string {
        return EventData_Move_Actor.NAME;
    }
}
