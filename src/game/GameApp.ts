import GameLogic from "./GameLogic";
import EventMgr from "./events/EventMgr";

export default class GameApp {
    gameLogic = new GameLogic();

    loadGame(w: number, h: number) {
        this.gameLogic.VLoadGame(w, h);
        console.log('Init!');
    }

    onUpdate(diff: number) {
        // Read keyboard events
        // Call this.gameLogic.gameView.onKey*(event)

        // Update game
        EventMgr.getInstance().VOnUpdate(30);
        this.gameLogic.VOnUpdate(diff);

        // Render game
        if (this.gameLogic.gameView) {
            return this.gameLogic.gameView.VOnRender(diff);
        }
    }
}
