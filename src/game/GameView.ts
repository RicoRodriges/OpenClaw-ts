import {IScreenElement} from "./user-interface/IScreenElement";
import ActorController from "./ActorController";
import ResourceMgr from "./ResourceMgr";
import ScreenElementLoadingScreen from "./user-interface/ScreenElementLoadingScreen";
import ScreenElementMenu from "./user-interface/ScreenElementMenu";

export default class GameView {
    screenElements: IScreenElement[];
    // screenElementHUD: IScreenElement;
    loadingScreen: IScreenElement;
    menuScreen: IScreenElement;
    keyBoardHandler: ActorController;
    isLoading = true;
    isInGameMenu = true;

    constructor(loadingScreen: ScreenElementLoadingScreen,
                menuScreen: ScreenElementMenu,
                screenElements: IScreenElement[], keyBoardHandler: ActorController) {
        this.loadingScreen = loadingScreen;
        this.menuScreen = menuScreen;
        this.screenElements = screenElements;
        this.keyBoardHandler = keyBoardHandler;
    }

    onKeyDown(e: KeyboardEvent) {
        if (!this.isLoading) {
            if (!this.isInGameMenu) {
                this.screenElements.forEach((se) => {
                    if (se.isVisible()) {
                        se.onKeyDown(e as KeyboardEvent);
                    }
                });
                this.keyBoardHandler.onKeyDown(e);
            } else {
                this.menuScreen.onKeyDown(e as KeyboardEvent);
            }
        } else {
            if (this.loadingScreen.isVisible()) {
                this.loadingScreen.onKeyDown(e as KeyboardEvent);
            }
        }
    }

    onKeyUp(e: KeyboardEvent) {
        if (!this.isLoading) {
            if (!this.isInGameMenu) {
                this.screenElements.forEach((se) => {
                    if (se.isVisible()) {
                        se.onKeyUp(e as KeyboardEvent);
                    }
                });
                this.keyBoardHandler.onKeyUp(e);
            } else {
                this.menuScreen.onKeyUp(e as KeyboardEvent);
            }
        } else {
            if (this.loadingScreen.isVisible()) {
                this.loadingScreen.onKeyUp(e as KeyboardEvent);
            }
        }
    }

    VOnRender(diff: number) {
        const resources = ResourceMgr.getInstance();
        const ctx = resources.context;
        if (ctx) {
            ctx.clearRect(0, 0, resources.canvasWidth, resources.canvasHeight);
            if (!this.isLoading) {
                if (!this.isInGameMenu) {
                    this.screenElements.forEach((s) => s.VOnRender(diff));
                } else {
                    this.menuScreen.VOnRender(diff);
                }
            } else {
                this.loadingScreen.VOnRender(diff);
            }
        }
    }

    VOnUpdate(diff: number) {
        if (!this.isLoading && !this.isInGameMenu) {
            this.keyBoardHandler.onUpdate(diff);
        }
    }
}
