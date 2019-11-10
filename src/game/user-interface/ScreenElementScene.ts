import Scene from "../scene/Scene";
import {IScreenElement} from "./IScreenElement";

export default class ScreenElementScene extends Scene implements IScreenElement {
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
        return this.root.VRender(this);
    }


}
