import Scene from "../scene/Scene";
import {IScreenElement} from "./IScreenElement";
import SceneNode from "../scene/SceneNode";
import ResourceMgr from "../ResourceMgr";
import {Animations} from "../enums/Animations";

export default class ScreenElementHud implements IScreenElement {
    score: number[];
    health: number[];

    constructor(private sceneNodes: Map<string, SceneNode>, private scene: Scene) {
        this.score = [0, 0, 0, 0, 0, 0, 0, 0];
        this.health = [0, 0, 1];
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

    updateScore(score: number) {
        for (let i = this.score.length - 1; i >= 0; --i) {
            this.score[i] = score % 10;
            score = ~~(score / 10);
        }
    }

    updateHealth(health: number) {
        for (let i = this.health.length - 1; i >= 0; --i) {
            this.health[i] = health % 10;
            health = ~~(health / 10);
        }
    }

    VOnRender(msDiff: number) {
        this.sceneNodes.forEach((n) => n.VRender(this.scene));

        const res = ResourceMgr.getInstance();
        const ctx = res.context;
        const anim = res.getAnimation(Animations.ui_points);
        if (ctx && anim) {
            const img = anim.frames[0].image;
            const sprite = res.getSprite(img.spriteName);
            if (sprite) {
                // TODO: remove hardcode
                const pointWidth = 12;
                const pointHeight = 27;

                // draw score
                const scoreOffsetX = 40;
                const scoreOffsetY = 17;
                const scorePointSpriteYOffset = 27;
                const scorePointSpriteXOffset = 0;
                for (let i = 0; i < this.score.length; ++i) {
                    ctx.drawImage(sprite.img,
                        scorePointSpriteXOffset + this.score[i] * pointWidth, scorePointSpriteYOffset, pointWidth, pointHeight,
                        scoreOffsetX + i * pointWidth, scoreOffsetY, pointWidth, pointHeight
                    );
                }

                // draw health
                const healthOffsetX = this.scene.camera.w - 65;
                const healthOffsetY = 17;
                const healthPointSpriteYOffset = 0;
                const healthPointSpriteXOffset = 0;
                for (let i = 0; i < this.health.length; ++i) {
                    ctx.drawImage(sprite.img,
                        healthPointSpriteXOffset + this.health[i] * pointWidth, healthPointSpriteYOffset, pointWidth, pointHeight,
                        healthOffsetX + (this.health.length - 1 - i) * pointWidth, healthOffsetY, pointWidth, pointHeight
                    );
                }
            }
        }
    }
}
