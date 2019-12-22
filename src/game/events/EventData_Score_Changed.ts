import {IEventData} from "./IEventData";
import {PickupType} from "../enums/PickupType";

export default class EventData_Score_Changed extends IEventData {
    static NAME = 'EventData_Score_Changed';

    constructor(public score: number, public pickupType: PickupType) {
        super();
    }

    getName(): string {
        return EventData_Score_Changed.NAME;
    }

    equals(e: IEventData): boolean {
        return super.equals(e) || this.getName() === e.getName();
    }
}
