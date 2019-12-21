import {IEventData} from "./IEventData";

export default class EventData_Menu_Exit extends IEventData {
    static NAME = 'EventData_Menu_Exit';

    getName(): string {
        return EventData_Menu_Exit.NAME;
    }

    equals(e: IEventData): boolean {
        return super.equals(e) || this.getName() === e.getName();
    }
}
