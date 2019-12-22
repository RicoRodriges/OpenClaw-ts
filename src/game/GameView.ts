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
    gameScreen: IScreenElement;
    screenElementHUD: ScreenElementHud;
    loadingScreen: IScreenElement;
    deathScreen: IScreenElement;
    finishScreen: ScreenElementFinishMenu;
    menuScreen: IScreenElement;
    keyBoardHandler: ActorController;

    currentScreen: IScreenElement;
    isMenu: boolean;

    constructor(loadingScreen: ScreenElementLoadingScreen,
                menuScreen: ScreenElementMenu,
                deathScreen: ScreenElementMenu,
                finishScreen: ScreenElementFinishMenu,
                screenElementHUD: ScreenElementHud,
                gameScreen: IScreenElement, keyBoardHandler: ActorController) {
        this.loadingScreen = loadingScreen;
        this.menuScreen = menuScreen;
        this.deathScreen = deathScreen;
        this.finishScreen = finishScreen;
        this.screenElementHUD = screenElementHUD;
        this.gameScreen = gameScreen;
        this.keyBoardHandler = keyBoardHandler;
        this.currentScreen = loadingScreen;
        this.isMenu = true;
        EventMgr.getInstance().VAddListener((e) => this.finishScreen.updateScore((e as EventData_Score_Changed)), EventData_Score_Changed.NAME);
        EventMgr.getInstance().VAddListener((e) => this.screenElementHUD.updateScore((e as EventData_Score_Changed).score), EventData_Score_Changed.NAME);
        EventMgr.getInstance().VAddListener((e) => this.screenElementHUD.updateHealth((e as EventData_Health_Changed).health), EventData_Health_Changed.NAME);
    }

    onKeyDown(e: KeyboardEvent) {
        this.currentScreen.onKeyDown(e);
        if (!this.isMenu) {
            this.screenElementHUD.onKeyDown(e);
            this.keyBoardHandler.onKeyDown(e);
        }
    }

    onKeyUp(e: KeyboardEvent) {
        this.currentScreen.onKeyUp(e);
        if (!this.isMenu) {
            this.screenElementHUD.onKeyUp(e);
            this.keyBoardHandler.onKeyUp(e);
        }
    }

    VOnRender(diff: number) {
        const resources = ResourceMgr.getInstance();
        const ctx = resources.context;
        if (ctx) {
            ctx.clearRect(0, 0, resources.canvasWidth, resources.canvasHeight);
            this.currentScreen.VOnRender(diff);
            if (!this.isMenu) {
                this.screenElementHUD.VOnRender(diff);
            }
        }
    }

    VOnUpdate(diff: number) {
        if (!this.isMenu) {
            this.keyBoardHandler.onUpdate(diff);
        }
    }
}
