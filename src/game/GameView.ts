import {IScreenElement} from "./user-interface/IScreenElement";
import ActorController from "./ActorController";

export default class GameView {
    screenElements: IScreenElement[];
    //inGameMenu: IScreenElement;
    keyBoardHandler: ActorController;
    svgDefBlock: any;

    constructor(screenElements: IScreenElement[], keyBoardHandler: ActorController, svgDefBlock: any) {
        this.screenElements = screenElements;
        this.keyBoardHandler = keyBoardHandler;
        this.svgDefBlock = svgDefBlock;
    }

    onKeyDown(e: KeyboardEvent) {
        this.screenElements.forEach((se) => {
            if (se.isVisible()) {
                se.onKeyDown(e as KeyboardEvent);
            }
        });
        // if (e.key === 'Escape' && this.inGameMenu && !this.inGameMenu.isVisible()) {
        //     this.inGameMenu.setVisible(true);
        // } else {
            this.keyBoardHandler.onKeyDown(e);
        // }
    }

    onKeyUp(e: KeyboardEvent) {
        this.screenElements.forEach((se) => {
            if (se.isVisible()) {
                se.onKeyUp(e as KeyboardEvent);
            }
        });
        this.keyBoardHandler.onKeyUp(e);
    }

    VOnRender(diff: number) {
        const svgElements = this.screenElements.map((s) => s.VOnRender(diff));
        return [this.svgDefBlock].concat(svgElements);
    }

    VOnUpdate(diff: number) {
        this.keyBoardHandler.onUpdate(diff);
    }
}
