import {IEventData} from "./IEventData";

export default class EventData_Actor_Fire implements IEventData{

    constructor(public actorId: number) {
    }

    getName(): string {
        return 'EventData_Actor_Fire';
    }
}
