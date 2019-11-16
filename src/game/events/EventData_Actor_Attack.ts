import {IEventData} from "./IEventData";
import Actor from "../actors/Actor";

export default class EventData_Actor_Attack extends IEventData {
    public static NAME = 'EventData_Actor_Attack';

    constructor(public a: Actor) {
        super();
    }

    getName(): string {
        return EventData_Actor_Attack.NAME;
    }
}
