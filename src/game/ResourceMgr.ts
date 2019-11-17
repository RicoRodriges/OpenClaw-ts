//import Image from "./graphics/Image";

import Rect from "./utils/Rect";
import Animation from "./graphics/Animation";

export default class ResourceMgr {
    private static self = new ResourceMgr();
    context: CanvasRenderingContext2D | null = null;
    canvasWidth = 0;
    canvasHeight = 0;
    private images = new Map<string, CanvasImageSource>();
    private sprites = new Map<string, SpriteInfo>();
    private animations = new Map<string, Animation>();
    private sounds = new Map<string, HTMLAudioElement>();
    private loadingGraphics = new Map<string, Promise<CanvasImageSource>>();
    private loadingSounds = new Map<string, Promise<HTMLAudioElement>>();

    static getInstance() {
        return ResourceMgr.self;
    }

    getImage(name: string): CanvasImageSource | undefined {
        return this.images.get(name);
    }

    getSprite(name: string) {
        const spriteInfo = this.sprites.get(name);
        if (spriteInfo) {
            const img = this.getImage(spriteInfo.imgName);
            if (img) {
                return new Sprite(img, spriteInfo.rect);
            }
        }
    }

    getAnimation(name: string) {
        return this.animations.get(name);
    }

    getSound(name: string) {
        return this.sounds.get(name);
    }

    loadImage(name: string, src: string) {
        if (!this.loadingGraphics.has(name) && !this.images.has(name)) {
            const promise = new Promise<CanvasImageSource>((r) => {
                const img = new Image();
                img.onload = () => {
                    r(img);
                };
                img.src = src;
            });
            this.loadingGraphics.set(name, promise);
            promise.then((img) => {
                this.images.set(name, img);
                this.loadingGraphics.delete(name);
            });
        }
    }

    loadSprite(spriteName: string, imageName: string, src: string, x: number, y: number, width: number, height: number) {
        this.loadImage(imageName, src);
        this.sprites.set(spriteName, new SpriteInfo(imageName, x, y, width, height));
    }

    loadSound(soundName: string, src: string) {
        if (!this.loadingSounds.has(soundName) && !this.sounds.has(soundName)) {
            const promise = new Promise<HTMLAudioElement>((r) => {
                const audio = new Audio();
                audio.onloadeddata = () => {
                    r(audio);
                };
                audio.src = src;
            });
            this.loadingSounds.set(soundName, promise);
            promise.then((audio) => {
                this.sounds.set(soundName, audio);
                this.loadingSounds.delete(soundName);
            });
        }
    }

    addAnimation(name: string, anim: Animation) {
        this.animations.set(name, anim);
    }

    isResourcesLoaded() {
        return this.loadingGraphics.size === 0 && this.loadingSounds.size === 0;
    }

}

export class Sprite {
    img: CanvasImageSource;
    rect: Rect;

    constructor(img: CanvasImageSource, rect: Rect) {
        this.img = img;
        this.rect = rect;
    }
}

class SpriteInfo {
    imgName: string;
    rect: Rect;

    constructor(imgName: string, x: number, y: number, width: number, height: number) {
        this.imgName = imgName;
        this.rect = new Rect(x, y, width, height);
    }
}
