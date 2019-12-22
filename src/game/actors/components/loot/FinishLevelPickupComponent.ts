import {PickupComponent} from "./PickupComponent";
import Actor from "../../Actor";
import TriggerComponent from "../TriggerComponent";
import {Sounds} from "../../../enums/Sounds";
import EventMgr from "../../../events/EventMgr";
import EventData_Request_Delete_Actor from "../../../events/EventData_Request_Delete_Actor";
import EventData_Level_Finish from "../../../events/EventData_Level_Finish";

export default class FinishLevelPickupComponent extends PickupComponent {
    public static NAME = 'FinishLevelPickupComponent';

    isPickedUp = false;

    constructor(owner: Actor, triggerComponent: TriggerComponent, pickup: Sounds | null) {
        super(owner, triggerComponent, pickup);
    }

    VOnApply(a: Actor) {
        if (!this.isPickedUp) {
            EventMgr.getInstance().VTriggerEvent(new EventData_Request_Delete_Actor(this.owner));
            EventMgr.getInstance().VQueueEvent(new EventData_Level_Finish());
            this.isPickedUp = true;
            return true;
        }

        return false;
    }

    getName() {
        return FinishLevelPickupComponent.NAME;
    }
}
