import GameApp from "./game/GameApp";
import ResourceMgr from "./game/ResourceMgr";

class ClawGame {
    game = new GameApp();

    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        canvas.width = width;
        canvas.height = height;

        const resource = ResourceMgr.getInstance();
        resource.context = canvas.getContext('2d');
        resource.canvasWidth = width;
        resource.canvasHeight = height;

        this.game.loadGame(width, height);

        window.requestAnimationFrame(this.loop.bind(this));
    }

    loop() {
        window.requestAnimationFrame(this.loop.bind(this));
        this.game.onUpdate(1000 / 60);
    }
}

const canvas = document.getElementById('claw-game') as HTMLCanvasElement;
new ClawGame(canvas, 800, 640);
