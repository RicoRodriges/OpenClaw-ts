import {PickupComponent} from "./PickupComponent";
import Actor from "../../Actor";
import TriggerComponent from "../TriggerComponent";
import {Sounds} from "../../../enums/Sounds";
import EventMgr from "../../../events/EventMgr";
import EventData_Request_Delete_Actor from "../../../events/EventData_Request_Delete_Actor";

export default class SoundPickupComponent extends PickupComponent {
    public static NAME = 'SoundPickupComponent';

    isPickedUp = false;

    constructor(owner: Actor, triggerComponent: TriggerComponent, pickup: Sounds) {
        super(owner, triggerComponent, pickup);
    }

    VOnApply(a: Actor) {
        if (!this.isPickedUp) {
            this.isPickedUp = true;
            EventMgr.getInstance().VTriggerEvent(new EventData_Request_Delete_Actor(this.owner));
            return true;
        }

        return false;
    }

    getName() {
        return SoundPickupComponent.NAME;
    }
}
