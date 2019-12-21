import Scene from "../scene/Scene";
import {IScreenElement} from "./IScreenElement";
import SceneNode from "../scene/SceneNode";

export default class ScreenElementLoadingScreen implements IScreenElement {
    constructor(private title: SceneNode, private scene: Scene) {
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

    VOnRender(msDiff: number) {
        this.title.VRender(this.scene);
    }


}
