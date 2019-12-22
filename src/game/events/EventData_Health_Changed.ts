import {IEventData} from "./IEventData";

export default class EventData_Health_Changed extends IEventData {
    static NAME = 'EventData_Health_Changed';

    constructor(public health: number) {
        super();
    }

    getName(): string {
        return EventData_Health_Changed.NAME;
    }

    equals(e: IEventData): boolean {
        return super.equals(e) || this.getName() === e.getName();
    }
}
