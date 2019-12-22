import Scene from "../scene/Scene";
import {IScreenElement} from "./IScreenElement";
import SceneNode from "../scene/SceneNode";
import {PickupType} from "../enums/PickupType";
import EventData_Score_Changed from "../events/EventData_Score_Changed";
import TitleSceneNode from "../scene/TitleSceneNode";

export default class ScreenElementHud implements IScreenElement {
    score = 0;
    treasures = new Map<PickupType, number>();
    sceneNodes: SceneNode[] = [];

    constructor(private scene: Scene, private totalTreasures: Map<PickupType, number>,
                private totalScore: number) {
    }

    onKeyDown(e: KeyboardEvent): void {
    }

    onKeyUp(e: KeyboardEvent): void {
    }

    setVisible(b: boolean): void {
    }

    isVisible(): boolean {
        return true;
    }

    updateScore(e: EventData_Score_Changed) {
        this.score = e.score;
        const prew = this.treasures.get(e.pickupType) || 0;
        this.treasures.set(e.pickupType, prew + 1);
    }

    VOnRender(msDiff: number) {
        if (this.sceneNodes.length === 0) {
            this.generateNodes();
        }
        this.sceneNodes.forEach((n) => n.VRender(this.scene));
    }

    private generateNodes() {
        this.sceneNodes = [
            new TitleSceneNode('Congratulations! You have finished the level!', 30, 30, 20),
            new TitleSceneNode('Treasures:', 30, 60, 20),
        ];

        let offset = 90;
        this.treasures.forEach((c, t) => {
            const total = this.totalTreasures.get(t) || 0;
            this.sceneNodes.push(
                new TitleSceneNode(t + ': ' + c + ' / ' + total, 30, offset, 20)
            );
            offset += 30;
        });

        this.sceneNodes.push(new TitleSceneNode('Score: ' + this.score + ' / ' + this.totalScore, 30, offset, 20))
    }
}
