import {IEventData} from "./IEventData";

export default class EventData_Level_Loaded extends IEventData {
    static NAME = 'EventData_Level_Loaded';

    getName(): string {
        return EventData_Level_Loaded.NAME;
    }

    equals(e: IEventData): boolean {
        return super.equals(e) || this.getName() === e.getName();
    }
}
