import {IEventData} from "./IEventData";

export default class EventData_Actor_Attack extends IEventData{

    constructor(public actorId: number) {
        super();
    }

    getName(): string {
        return 'EventData_Actor_Attack';
    }
}
