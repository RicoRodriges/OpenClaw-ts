import {IScreenElement} from "./user-interface/IScreenElement";
import ActorController from "./ActorController";
import ResourceMgr from "./ResourceMgr";

export default class GameView {
    screenElements: IScreenElement[];
    loadingScreen: IScreenElement[];
    keyBoardHandler: ActorController;
    isLoading = true;

    constructor(loadingScreen: IScreenElement[], screenElements: IScreenElement[], keyBoardHandler: ActorController) {
        this.loadingScreen = loadingScreen;
        this.screenElements = screenElements;
        this.keyBoardHandler = keyBoardHandler;
    }

    onKeyDown(e: KeyboardEvent) {
        if (!this.isLoading) {
            this.screenElements.forEach((se) => {
                if (se.isVisible()) {
                    se.onKeyDown(e as KeyboardEvent);
                }
            });
            this.keyBoardHandler.onKeyDown(e);
        } else {
            this.loadingScreen.forEach((se) => {
                if (se.isVisible()) {
                    se.onKeyDown(e as KeyboardEvent);
                }
            });
        }
    }

    onKeyUp(e: KeyboardEvent) {
        if (!this.isLoading) {
            this.screenElements.forEach((se) => {
                if (se.isVisible()) {
                    se.onKeyUp(e as KeyboardEvent);
                }
            });
            this.keyBoardHandler.onKeyUp(e);
        } else {
            this.loadingScreen.forEach((se) => {
                if (se.isVisible()) {
                    se.onKeyUp(e as KeyboardEvent);
                }
            });
        }
    }

    VOnRender(diff: number) {
        const resources = ResourceMgr.getInstance();
        const ctx = resources.context;
        if (ctx) {
            ctx.clearRect(0, 0, resources.canvasWidth, resources.canvasHeight);
            if (!this.isLoading) {
                this.screenElements.forEach((s) => s.VOnRender(diff));
            } else {
                this.loadingScreen.forEach((s) => s.VOnRender(diff));
            }
        }
    }

    VOnUpdate(diff: number) {
        if (!this.isLoading) {
            this.keyBoardHandler.onUpdate(diff);
        }
    }
}
