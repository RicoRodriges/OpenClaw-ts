import {DamageType} from "../../enums/DamageType";
import Actor from "../Actor";
import ActorComponent from "../ActorComponent";


export default class HealthComponent extends ActorComponent {
    public static NAME = 'HealthComponent';

    public observers: HealthObserver[] = [];

    constructor(owner: Actor, public maxHealth: number, public currentHealth: number, public isControlled = false,
                public isInvulnerable = false) {
        super(owner);
    }

    AddHealth(health: number, damageType: DamageType, sourceActor: Actor) {
        if ((this.isInvulnerable && health < 0) && (damageType !== DamageType.DamageType_DeathTile)) {
            return;
        }

        const oldHealth = this.currentHealth;
        this.currentHealth += health;
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }

        if (oldHealth !== this.currentHealth) {
            this.BroadcastHealthChanged(oldHealth, this.currentHealth, damageType, sourceActor);
        }
    }

    getName(): string {
        return HealthComponent.NAME;
    }

    private BroadcastHealthChanged(oldHealth: number, newHealth: number, damageType: DamageType, sourceActor: Actor) {
        this.NotifyHealthChanged(oldHealth, newHealth, damageType, sourceActor);
        if (newHealth <= 0) {
            this.NotifyHealthBelowZero(damageType, sourceActor);
        }

        // TODO: Only broadcast controllers health. this is abit hacky
        // if (this.isControlled)
        // {
        //     EventMgr.getInstance().VQueueEvent(new EventData_Updated_Health(oldHealth, newHealth, isInitial));
        // }
    }

    private NotifyHealthChanged(oldHealth: number, newHealth: number, damageType: DamageType, sourceActor: Actor) {
        this.observers.forEach((o) => o.VOnHealthChanged(oldHealth, newHealth, damageType, sourceActor));
    }

    private NotifyHealthBelowZero(damageType: DamageType, sourceActor: Actor) {
        this.observers.forEach((o) => o.VOnHealthBelowZero(damageType, sourceActor));
    }
}

export interface HealthObserver {
    VOnHealthChanged(oldHealth: number, newHealth: number, damageType: DamageType, sourceActor: Actor): void;

    VOnHealthBelowZero(damageType: DamageType, sourceActor: Actor): void;
}
