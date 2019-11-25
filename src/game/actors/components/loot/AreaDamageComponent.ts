import {PickupComponent} from "./PickupComponent";
import Actor from "../../Actor";
import {Sounds} from "../../../enums/Sounds";
import TriggerComponent from "../TriggerComponent";
import EventMgr from "../../../events/EventMgr";
import EventData_Request_Delete_Actor from "../../../events/EventData_Request_Delete_Actor";

export default class AreaDamageComponent extends PickupComponent {
    activeTime = 0;

    constructor(owner: Actor, triggerComponent: TriggerComponent, pickup: Sounds | null, private duration: number = 0) {
        super(owner, triggerComponent, pickup);
    }


    VUpdate(diff: number) {
        super.VUpdate(diff);
        if (this.duration > 0) {
            this.activeTime += diff;
            if (this.activeTime >= this.duration) {
                EventMgr.getInstance().VQueueEvent(new EventData_Request_Delete_Actor(this.owner));
            }
        }
    }

    VOnApply(a: Actor) {
        // TODO: health logic
        console.log('Actor take damage');
        return false;
    }

}
