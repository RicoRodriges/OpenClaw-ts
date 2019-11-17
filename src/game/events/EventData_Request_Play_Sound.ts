import {IEventData} from "./IEventData";
import {Sounds} from "../enums/Sounds";

export default class EventData_Request_Play_Sound extends IEventData {
    public static NAME = 'EventData_Request_Play_Sound';

    constructor(public sound: Sounds) {
        super();
    }

    getName(): string {
        return EventData_Request_Play_Sound.NAME;
    }
}
