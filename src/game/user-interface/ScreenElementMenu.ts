import Scene from "../scene/Scene";
import {IScreenElement} from "./IScreenElement";
import SceneNode from "../scene/SceneNode";
import EventMgr from "../events/EventMgr";
import EventData_Menu_Exit from "../events/EventData_Menu_Exit";

export default class ScreenElementMenu implements IScreenElement {
    constructor(private sceneNodes: SceneNode[], private scene: Scene) {
    }

    onKeyDown(e: KeyboardEvent): void {

    }

    onKeyUp(e: KeyboardEvent): void {
        EventMgr.getInstance().VTriggerEvent(new EventData_Menu_Exit());
    }

    setVisible(b: boolean): void {
    }

    isVisible(): boolean {
        return true;
    }

    VOnRender(msDiff: number) {
        this.sceneNodes.forEach((n) => n.VRender(this.scene));
    }


}
