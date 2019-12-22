import Rect from "./utils/Rect";
import Animation from "./graphics/Animation";
import {TreasureDef} from "./LevelData";
import {PickupType} from "./enums/PickupType";
import {popRandomItem} from "./utils/Util";
import {Sounds} from "./enums/Sounds";
import {Animations} from "./enums/Animations";

export default class ResourceMgr {
    private static self = new ResourceMgr();
    context: CanvasRenderingContext2D | null = null;
    canvasWidth = 0;
    canvasHeight = 0;
    private images = new Map<string, CanvasImageSource>();
    private sprites = new Map<string, SpriteInfo>();
    private animations = new Map<string, Animation>();
    private treasures = new Map<PickupType, Treasure[]>();
    private sounds = new Map<string, HTMLAudioElement>();
    private loadingGraphics = new Map<string, CanvasImageSource>();
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
            //const img = this.getImage(spriteInfo.imgName);
            const img = spriteInfo.img;
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

    loadImage(name: string, src: string): CanvasImageSource {
        if (!this.loadingGraphics.has(name) && !this.images.has(name)) {
            const img = new Image();
            const promise = new Promise<CanvasImageSource>((r) => {
                img.onload = () => {
                    r(img);
                };
                img.src = src;
            });
            this.loadingGraphics.set(name, img);
            promise.then((img) => {
                this.images.set(name, img);
                this.loadingGraphics.delete(name);
            });
            return img;
        }
        return (this.loadingGraphics.get(name) || this.images.get(name)) as CanvasImageSource;
    }

    loadSprite(spriteName: string, imageName: string, src: string, x: number, y: number, width: number, height: number) {
        const img = this.loadImage(imageName, src);
        this.sprites.set(spriteName, new SpriteInfo(imageName, img, x, y, width, height));
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

    loadTreasures(treasures: TreasureDef[]) {
        treasures.forEach((t) => {
            const treasureEntity = this.treasures.get(t.type) || [];
            this.treasures.set(t.type, treasureEntity);
            t.anims.forEach((a) => treasureEntity.push(new Treasure(t.w, t.h, a.name, t.score, t.pickupSound)));
        });
    }

    getTreasure(type: PickupType): Treasure | null {
        const treasures = this.treasures.get(type);
        if (treasures && treasures.length > 0) {
            return popRandomItem(treasures);
        }
        return null;
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
    rect: Rect;

    constructor(public imgName: string, public img: CanvasImageSource, x: number, y: number, width: number, height: number) {
        this.rect = new Rect(x, y, width, height);
    }
}

export class Treasure {
    constructor(public w: number, public h: number, public anim: Animations, public score: number,
                public sounds: Sounds) {
    }
}
