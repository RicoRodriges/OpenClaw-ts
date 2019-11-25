import ActorComponent from "../ActorComponent";
import Actor from "../Actor";
import {FixtureType} from "../../enums/FixtureType";

export default class TriggerComponent extends ActorComponent {
    public static NAME = 'TriggerComponent';
    public observers: TriggerObserver[] = [];

    constructor(owner: Actor) {
        super(owner);
    }

    OnActorEntered(pActor: Actor, triggerType: FixtureType) {
        this.observers.forEach((o) => o.VOnActorEnteredTrigger(pActor, triggerType));
    }

    OnActorLeft(pActor: Actor, triggerType: FixtureType) {
        this.observers.forEach((o) => o.VOnActorLeftTrigger(pActor, triggerType));
    }

    getName(): string {
        return TriggerComponent.NAME;
    }

    Destroy() {
        this.observers = [];
    }
}

export interface TriggerObserver {
    VOnActorEnteredTrigger(pActorWhoEntered: Actor, triggerType: FixtureType): void;

    VOnActorLeftTrigger(pActorWhoLeft: Actor, triggerType: FixtureType): void;
}
