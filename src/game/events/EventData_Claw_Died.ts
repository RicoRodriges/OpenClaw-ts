import {IEventData} from "./IEventData";

export default class EventData_Claw_Died extends IEventData {
    static NAME = 'EventData_Claw_Died';

    getName(): string {
        return EventData_Claw_Died.NAME;
    }

    equals(e: IEventData): boolean {
        return super.equals(e) || this.getName() === e.getName();
    }
}
