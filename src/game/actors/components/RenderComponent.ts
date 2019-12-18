import ActorComponent from "../ActorComponent";
import Image from "../../graphics/Image";
import Actor from "../Actor";

export default abstract class RenderComponent extends ActorComponent {
    VIsVisible(): boolean {
        return true;
    }

    isMirrored() {
        return false;
    }

    isYInverted() {
        return false;
    }
}

export class ActorRenderComponent extends RenderComponent {
    public static readonly NAME = 'ActorRenderComponent';
    image?: Image;
    mirror = false;

    constructor(owner: Actor) {
        super(owner);
    }

    isMirrored() {
        return this.mirror;
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
}

export class TileRenderComponent extends RenderComponent {
    public static readonly NAME = 'TileRenderComponent';

    constructor(owner: Actor, public tileWidth: number, public tileHeight: number,
                public tiles: TileId[][][], public zIndex = 1, public repeated = false) {
        super(owner);
    }

    getName(): string {
        return TileRenderComponent.NAME;
    }
}

export interface TileId {
    id: number;
}
