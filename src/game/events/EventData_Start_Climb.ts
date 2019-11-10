import {IEventData} from "./IEventData";
import Point from "../utils/Point";

export default class EventData_Start_Climb extends IEventData {

    constructor(public actorId: number, public climbMovement: Point) {
        super();
    }

    getName(): string {
        return 'EventData_Start_Climb';
    }
}
