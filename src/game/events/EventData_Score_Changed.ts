import {IEventData} from "./IEventData";

export default class EventData_Score_Changed extends IEventData {
    static NAME = 'EventData_Score_Changed';

    constructor(public score: number) {
        super();
    }

    getName(): string {
        return EventData_Score_Changed.NAME;
    }

    equals(e: IEventData): boolean {
        return super.equals(e) || this.getName() === e.getName();
    }
}
