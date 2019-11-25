import {IEventData} from "./IEventData";
import Actor from "../actors/Actor";

export default class EventData_Request_Delete_Actor extends IEventData {
    public static NAME = 'EventData_Request_Delete_Actor';

    constructor(public a: Actor) {
        super();
    }

    getName(): string {
        return EventData_Request_Delete_Actor.NAME;
    }

    equals(e: IEventData): boolean {
        return super.equals(e) || (this.getName() === e.getName() && this.a === (e as EventData_Request_Delete_Actor).a);
    }
}
