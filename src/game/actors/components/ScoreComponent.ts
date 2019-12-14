import ActorComponent from "../ActorComponent";
import Actor from "../Actor";

export default class ScoreComponent extends ActorComponent {
    public static NAME = 'ScoreComponent';

    constructor(owner: Actor, public score = 0) {
        super(owner);
    }

    getName() {
        return ScoreComponent.NAME;
    }

    AddScorePoints(scorePoints: number) {
        // TODO: implement score
    }
}
