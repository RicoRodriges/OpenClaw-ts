import {IEventData} from "./IEventData";
import Actor from "../actors/Actor";

export default class EventData_Request_New_Actor extends IEventData {
    public static NAME = 'EventData_Request_New_Actor';

    constructor(public a: Actor) {
        super();
    }

    getName(): string {
        return EventData_Request_New_Actor.NAME;
    }
}
