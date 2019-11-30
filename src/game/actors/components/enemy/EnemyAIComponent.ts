import ActorComponent from "../../ActorComponent";
import {EnemyAIStateComponent} from "./EnemyAIStateComponent";
import Actor from "../../Actor";
import {Sounds} from "../../../enums/Sounds";
import EventMgr from "../../../events/EventMgr";
import EventData_Request_Play_Sound from "../../../events/EventData_Request_Play_Sound";
import HealthComponent, {HealthObserver} from "../HealthComponent";
import {DamageType} from "../../../enums/DamageType";
import {EnemyAIState} from "../../../enums/EnemyAIState";
import PhysicsComponent from "../PhysicsComponent";
import ClawControllableComponent from "../ClawControllableComponent";
import Animation from "../../../graphics/Animation";
import AnimationComponent from "../AnimationComponent";
import PositionComponent from "../PositionComponent";
import EventData_Move_Actor from "../../../events/EventData_Move_Actor";
import EventData_Request_Delete_Actor from "../../../events/EventData_Request_Delete_Actor";

export default class EnemyAIComponent extends ActorComponent implements HealthObserver {
    public static NAME = 'EnemyAIComponent';

    public states: EnemyAIStateComponent[] = [];
    isDead = false;
    deadTimeout = 2000;

    // isStateLocked = false;

    constructor(owner: Actor, healthComponent: HealthComponent, private deathAnim: Animation | null, private deathSound: Sounds[],
                private physicsComponent: PhysicsComponent, private animationComponent: AnimationComponent,
                private positionComponent: PositionComponent, private splashSound: Sounds | null) {
        super(owner);
        healthComponent.observers.push(this);
    }

    getName(): string {
        return EnemyAIComponent.NAME;
    }


    VUpdate(diff: number) {
        if (this.isDead) {
            this.deadTimeout -= diff;
            if (this.deadTimeout > 0) {
                this.positionComponent.position.x += (600 / 900.0 * diff);
                this.positionComponent.position.y += (600 / 900.0 * diff);
                EventMgr.getInstance().VTriggerEvent(new EventData_Move_Actor(this.owner, this.positionComponent.position));
            } else {
                EventMgr.getInstance().VQueueEvent(new EventData_Request_Delete_Actor(this.owner));

                if (this.splashSound) {
                    EventMgr.getInstance().VQueueEvent(new EventData_Request_Play_Sound(this.splashSound));
                }
            }

            if (this.deathAnim) {
                this.animationComponent.setAnimation(this.deathAnim);
            }
        }
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

    VOnHealthBelowZero(damageType: DamageType, sourceActor: Actor) {
        this.isDead = true;
        this.states.forEach((s) => {
            if (s.isActive) {
                s.VOnStateLeave(null);
            }
        });

        // Play deaht sound
        if (this.deathSound && this.deathSound.length > 0) {
            const i = Math.floor(Math.random() * 100) % this.deathSound.length;
            EventMgr.getInstance().VQueueEvent(new EventData_Request_Play_Sound(this.deathSound[i]));
        }

        this.physicsComponent.Destroy();

        if (sourceActor) {
            const controllableComponent = sourceActor.getComponent(ClawControllableComponent.NAME) as ClawControllableComponent;
            if (controllableComponent) {
                controllableComponent.OnClawKilledEnemy(damageType, this.owner);
            }
        }
    }

    VOnHealthChanged(oldHealth: number, newHealth: number, damageType: DamageType, sourceActor: Actor) {
        if (newHealth >= 0) {
            const damageState = this.states.find((s) => s.VGetStateType() === EnemyAIState.EnemyAIState_TakingDamage);
            if (damageState) {
                this.EnterState(damageState);
            }
        }
    }
}
