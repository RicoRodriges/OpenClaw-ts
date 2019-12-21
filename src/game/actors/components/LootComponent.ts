import ActorComponent from "../ActorComponent";
import HealthComponent, {HealthObserver} from "./HealthComponent";
import Actor from "../Actor";
import {DamageType} from "../../enums/DamageType";
import {PickupType} from "../../enums/PickupType";
import PositionComponent from "./PositionComponent";
import {createTreasureActor} from "../../utils/Converters";
import ResourceMgr from "../../ResourceMgr";
import GamePhysics from "../../GamePhysics";
import EventMgr from "../../events/EventMgr";
import EventData_Request_New_Actor from "../../events/EventData_Request_New_Actor";

export default class LootComponent extends ActorComponent implements HealthObserver {
    public static NAME = 'LootComponent';

    constructor(owner: Actor, private loot: Map<PickupType, number>,
                healthComponent: HealthComponent, private positionComponent: PositionComponent,
                private physics: GamePhysics) {
        super(owner);
        healthComponent.observers.push(this);
    }

    VOnHealthBelowZero(damageType: DamageType, sourceActor: Actor) {
        if (this.loot.size) {
            const resources = ResourceMgr.getInstance();
            const pos = this.positionComponent.position;
            this.loot.forEach((c, t) => {
                for (let i = 0; i < c; ++i) {
                    // random treasure color
                    const treasure = resources.getTreasure(t);
                    if (!treasure)
                        break;
                    const actor = createTreasureActor(pos.x, pos.y, treasure.w, treasure.h, t, treasure.anim, this.physics, false, treasure.sounds, treasure.score);
                    EventMgr.getInstance().VTriggerEvent(new EventData_Request_New_Actor(actor));
                }
            });
            this.loot.clear();
        }
    }

    VOnHealthChanged(oldHealth: number, newHealth: number, damageType: DamageType, sourceActor: Actor): void {
    }

    getName(): string {
        return LootComponent.NAME;
    }

}
