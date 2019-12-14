import {PickupComponent} from "./PickupComponent";
import Actor from "../../Actor";
import TriggerComponent from "../TriggerComponent";
import {Sounds} from "../../../enums/Sounds";
import ScoreComponent from "../ScoreComponent";
import PositionComponent from "../PositionComponent";
import EventMgr from "../../../events/EventMgr";
import EventData_Move_Actor from "../../../events/EventData_Move_Actor";
import EventData_Request_Delete_Actor from "../../../events/EventData_Request_Delete_Actor";
import GamePhysics from "../../../GamePhysics";

export default class TreasurePickupComponent extends PickupComponent {
    public static NAME = 'TreasurePickupComponent';

    isPickedUp = false;

    constructor(owner: Actor, triggerComponent: TriggerComponent, pickup: Sounds | null,
                private scorePoints: number,
                private physics: GamePhysics,
                private positionComponent: PositionComponent,
                private destroyDelay = 1000) {
        super(owner, triggerComponent, pickup);
    }

    VUpdate(diff: number) {
        super.VUpdate(diff);
        if (this.isPickedUp) {
            this.destroyDelay -= diff;
            if (this.destroyDelay > 0) {
                const delta = -(800 / 900.0 * diff);
                this.positionComponent.position.x += delta;
                this.positionComponent.position.y += delta;
                EventMgr.getInstance().VTriggerEvent(new EventData_Move_Actor(this.owner, this.positionComponent.position));
            } else {
                EventMgr.getInstance().VTriggerEvent(new EventData_Request_Delete_Actor(this.owner));
            }
        }
    }

    VOnApply(a: Actor) {
        if (!this.isPickedUp) {
            const scoreComponent = a.getComponent(ScoreComponent.NAME) as ScoreComponent;
            if (scoreComponent) {
                scoreComponent.AddScorePoints(this.scorePoints);
                this.isPickedUp = true;
                this.physics.VRemoveActor(this.owner);
                return true;
            }
        }

        return false;
    }

    getName() {
        return TreasurePickupComponent.NAME;
    }
}
