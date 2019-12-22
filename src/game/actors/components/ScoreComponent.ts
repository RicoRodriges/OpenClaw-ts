import ActorComponent from "../ActorComponent";
import Actor from "../Actor";
import {PickupType} from "../../enums/PickupType";
import EventMgr from "../../events/EventMgr";
import EventData_Score_Changed from "../../events/EventData_Score_Changed";

export default class ScoreComponent extends ActorComponent {
    public static NAME = 'ScoreComponent';

    constructor(owner: Actor, public score = 0) {
        super(owner);
    }

    getName() {
        return ScoreComponent.NAME;
    }

    AddScorePoints(scorePoints: number, pickupType: PickupType) {
        this.score += scorePoints;
        EventMgr.getInstance().VTriggerEvent(new EventData_Score_Changed(this.score));
        // TODO: implement score
    }
}
