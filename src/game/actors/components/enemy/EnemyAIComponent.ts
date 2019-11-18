import ActorComponent from "../../ActorComponent";
import {EnemyAIStateComponent} from "./EnemyAIStateComponent";
import Actor from "../../Actor";
import {Sounds} from "../../../enums/Sounds";
import EventMgr from "../../../events/EventMgr";
import EventData_Request_Play_Sound from "../../../events/EventData_Request_Play_Sound";

export default class EnemyAIComponent extends ActorComponent {
    public static NAME = 'EnemyAIComponent';

    public states: EnemyAIStateComponent[] = [];

    // isStateLocked = false;

    constructor(owner: Actor) {
        super(owner);
    }

    getName(): string {
        return EnemyAIComponent.NAME;
    }

    EnterBestState(canForceEnter: boolean) {
        const pCurrentState = this.GetCurrentState();

        // if (this.isStateLocked && !canForceEnter && pCurrentState) {
        //     return false;
        // }

        let pBestState: EnemyAIStateComponent | undefined = undefined;
        let bestStatePrio = -1;

        this.states.forEach((s) => {
            if (s === pCurrentState) {
                return;
            }

            if (s.VCanEnter() && s.priority > bestStatePrio) {
                pBestState = s;
                bestStatePrio = s.priority;
            }
        });

        if (pBestState && (!pCurrentState || !pCurrentState.VCanEnter() || pCurrentState.priority < bestStatePrio)) {
            // this.isStateLocked = false;
            // // If best prio has some positive values, then we can only force switch it
            // if (bestStatePrio > 0) {
            //     this.isStateLocked = true;
            // }
            this.EnterState(pBestState);
            return true;
        }

        return false;
    }

    GetCurrentState() {
        return this.states.find((s) => s.isActive);
    }

    private LeaveAllStates(pNewState: EnemyAIStateComponent) {
        this.states.forEach((s) => {
            if (s.isActive) {
                s.VOnStateLeave(pNewState);
            }
        });
    }

    private EnterState(pNewState: EnemyAIStateComponent) {
        this.LeaveAllStates(pNewState);
        pNewState.VOnStateEnter(pNewState);
    }

    TryPlaySpeechSound(chance: number, sounds: Sounds[]) {
        if (sounds.length > 0) {
            if (Math.random() <= chance) {
                const index = Math.round(Math.random() * 100) % sounds.length;
                EventMgr.getInstance().VTriggerEvent(new EventData_Request_Play_Sound(sounds[index]));
            }
        }
    }
}
