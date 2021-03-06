import ActorComponent from "../../ActorComponent";
import TriggerComponent, {TriggerObserver} from "../TriggerComponent";
import {FixtureType} from "../../../enums/FixtureType";
import Actor from "../../Actor";
import {Sounds} from "../../../enums/Sounds";
import EventMgr from "../../../events/EventMgr";
import EventData_Request_Play_Sound from "../../../events/EventData_Request_Play_Sound";

export abstract class PickupComponent extends ActorComponent implements TriggerObserver {
    public static NAME = 'PickupComponent';
    actorsInTheArea = new Set<Actor>();

    abstract VOnApply(a: Actor): boolean;

    protected constructor(owner: Actor, private triggerComponent: TriggerComponent,
                          private pickup: Sounds | null = null) {
        super(owner);
        triggerComponent.observers.push(this);
    }

    VOnActorEnteredTrigger(pActorWhoEntered: Actor, triggerType: FixtureType) {
        if (!this.actorsInTheArea.has(pActorWhoEntered)) {
            if (this.VOnApply(pActorWhoEntered)) {
                this.triggerComponent.Destroy();

                if (this.pickup != null) {
                    EventMgr.getInstance().VTriggerEvent(new EventData_Request_Play_Sound(this.pickup));
                }
            }
            this.actorsInTheArea.add(pActorWhoEntered);
        }
    }

    VOnActorLeftTrigger(pActorWhoLeft: Actor, triggerType: FixtureType) {
        this.actorsInTheArea.delete(pActorWhoLeft);
    }

    getName(): string {
        return PickupComponent.NAME;
    }

}
