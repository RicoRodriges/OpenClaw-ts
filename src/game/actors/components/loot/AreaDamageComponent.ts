import {PickupComponent} from "./PickupComponent";
import Actor from "../../Actor";
import {Sounds} from "../../../enums/Sounds";
import TriggerComponent from "../TriggerComponent";
import EventMgr from "../../../events/EventMgr";
import EventData_Request_Delete_Actor from "../../../events/EventData_Request_Delete_Actor";
import HealthComponent from "../HealthComponent";
import {DamageType} from "../../../enums/DamageType";

export default class AreaDamageComponent extends PickupComponent {
    activeTime = 0;

    constructor(owner: Actor, triggerComponent: TriggerComponent, pickup: Sounds | null, private damage: number,
                private damageType: DamageType, private sourceActor: Actor,
                private duration: number = 0) {
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
        const healthComponent = a.getComponent(HealthComponent.NAME) as HealthComponent;
        if (healthComponent) {
            healthComponent.AddHealth(-this.damage, this.damageType, this.sourceActor);
        }
        return false;
    }

}
