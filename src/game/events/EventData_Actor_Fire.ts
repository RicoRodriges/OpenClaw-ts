import {IEventData} from "./IEventData";

export default class EventData_Actor_Fire extends IEventData{

    constructor(public actorId: number) {
        super();
    }

    getName(): string {
        return 'EventData_Actor_Fire';
    }
}
