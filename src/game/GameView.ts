import {IScreenElement} from "./user-interface/IScreenElement";
import ActorController from "./ActorController";
import ResourceMgr from "./ResourceMgr";
import ScreenElementLoadingScreen from "./user-interface/ScreenElementLoadingScreen";
import ScreenElementMenu from "./user-interface/ScreenElementMenu";
import ScreenElementHud from "./user-interface/ScreenElementHud";
import EventMgr from "./events/EventMgr";
import EventData_Score_Changed from "./events/EventData_Score_Changed";
import EventData_Health_Changed from "./events/EventData_Health_Changed";
import ScreenElementFinishMenu from "./user-interface/ScreenElementFinishMenu";

export default class GameView {
    screenElements: IScreenElement[];
    screenElementHUD: ScreenElementHud;
    loadingScreen: IScreenElement;
    deathScreen: IScreenElement;
    finishScreen: ScreenElementFinishMenu;
    menuScreen: IScreenElement;
    keyBoardHandler: ActorController;
    isLoading = true;
    isInGameMenu = true;
    isDeathMenu = false;
    isFinishMenu = false;

    constructor(loadingScreen: ScreenElementLoadingScreen,
                menuScreen: ScreenElementMenu,
                deathScreen: ScreenElementMenu,
                finishScreen: ScreenElementFinishMenu,
                screenElementHUD: ScreenElementHud,
                screenElements: IScreenElement[], keyBoardHandler: ActorController) {
        this.loadingScreen = loadingScreen;
        this.menuScreen = menuScreen;
        this.deathScreen = deathScreen;
        this.finishScreen = finishScreen;
        this.screenElementHUD = screenElementHUD;
        this.screenElements = screenElements;
        this.keyBoardHandler = keyBoardHandler;
        EventMgr.getInstance().VAddListener((e) => this.finishScreen.updateScore((e as EventData_Score_Changed)), EventData_Score_Changed.NAME);
        EventMgr.getInstance().VAddListener((e) => this.screenElementHUD.updateScore((e as EventData_Score_Changed).score), EventData_Score_Changed.NAME);
        EventMgr.getInstance().VAddListener((e) => this.screenElementHUD.updateHealth((e as EventData_Health_Changed).health), EventData_Health_Changed.NAME);
    }

    onKeyDown(e: KeyboardEvent) {
        if (!this.isLoading) {
            if (!this.isInGameMenu) {
                if (!this.isDeathMenu) {
                    if (!this.isFinishMenu) {
                        this.screenElements.forEach((se) => {
                            if (se.isVisible()) {
                                se.onKeyDown(e as KeyboardEvent);
                            }
                        });
                        this.screenElementHUD.onKeyDown(e);
                        this.keyBoardHandler.onKeyDown(e);
                    } else {
                        this.finishScreen.onKeyDown(e);
                    }
                } else {
                    this.deathScreen.onKeyDown(e);
                }
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
                if (!this.isDeathMenu) {
                    if (!this.isFinishMenu) {
                        this.screenElements.forEach((se) => {
                            if (se.isVisible()) {
                                se.onKeyUp(e as KeyboardEvent);
                            }
                        });
                        this.screenElementHUD.onKeyUp(e);
                        this.keyBoardHandler.onKeyUp(e);
                    } else {
                        this.finishScreen.onKeyUp(e);
                    }
                } else {
                    this.deathScreen.onKeyUp(e);
                }
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
                    if (!this.isDeathMenu) {
                        if (!this.isFinishMenu) {
                            this.screenElements.forEach((s) => s.VOnRender(diff));
                            this.screenElementHUD.VOnRender(diff);
                        } else {
                            this.finishScreen.VOnRender(diff);
                        }
                    } else {
                        this.deathScreen.VOnRender(diff);
                    }
                } else {
                    this.menuScreen.VOnRender(diff);
                }
            } else {
                this.loadingScreen.VOnRender(diff);
            }
        }
    }

    VOnUpdate(diff: number) {
        if (!this.isLoading && !this.isInGameMenu && !this.isDeathMenu && !this.isFinishMenu) {
            this.keyBoardHandler.onUpdate(diff);
        }
    }
}
