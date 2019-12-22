import {IEventData} from "./IEventData";

export default class EventData_Level_Finish extends IEventData {
    static NAME = 'EventData_Level_Finish';

    getName(): string {
        return EventData_Level_Finish.NAME;
    }

    equals(e: IEventData): boolean {
        return super.equals(e) || this.getName() === e.getName();
    }
}
