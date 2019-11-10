import {IEventData} from "./IEventData";

export default class EventData_Request_Change_Ammo_Type extends IEventData{

    constructor(public actorId: number) {
        super();
    }

    getName(): string {
        return 'EventData_Request_Change_Ammo_Type';
    }
}
