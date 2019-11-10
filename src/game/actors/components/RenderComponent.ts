import ActorComponent from "../ActorComponent";
import Image from "../../graphics/Image";
import Actor from "../Actor";

export default abstract class RenderComponent extends ActorComponent {

}

export class ActorRenderComponent extends RenderComponent {
    public static readonly NAME = 'ActorRenderComponent';
    image?: Image;

    constructor(owner: Actor) {
        super(owner);
    }

    VIsVisible(): boolean {
        return true;
    }

    isMirrored() {
        return false;
    }

    isYInverted() {
        return false;
    }

    setCurrentImage(img: Image) {
        this.image = img;
    }

    getCurrentImage(): Image | undefined {
        return this.image;
    }

    getName(): string {
        return ActorRenderComponent.NAME;
    }

    VUpdate(diff: number) {
    }
}

export class TileRenderComponent extends RenderComponent {
    public static readonly NAME = 'TileRenderComponent';

    constructor(owner: Actor, public tileWidth: number, public tileHeight: number, public tiles: TileId[][][]) {
        super(owner);
    }

    VIsVisible(): boolean {
        return true;
    }

    isMirrored() {
        return false;
    }

    isYInverted() {
        return false;
    }

    getName(): string {
        return TileRenderComponent.NAME;
    }

    VUpdate(diff: number) {
    }
}

export interface TileId {
    id: number;
}
