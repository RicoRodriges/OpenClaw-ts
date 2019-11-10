import {IEventData} from "./IEventData";
import Point from "../utils/Point";

export default class EventData_Start_Climb implements IEventData {

    constructor(public actorId: number, public climbMovement: Point) {
    }

    getName(): string {
        return 'EventData_Start_Climb';
    }
}
