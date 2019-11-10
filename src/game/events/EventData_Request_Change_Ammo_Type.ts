import {IEventData} from "./IEventData";

export default class EventData_Request_Change_Ammo_Type implements IEventData{

    constructor(public actorId: number) {
    }

    getName(): string {
        return 'EventData_Request_Change_Ammo_Type';
    }
}
