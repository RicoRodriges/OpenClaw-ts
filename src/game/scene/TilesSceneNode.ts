import SceneNode from "./SceneNode";
import Scene from "./Scene";
import {TileRenderComponent} from "../actors/components/RenderComponent";
import ResourceMgr from "../ResourceMgr";

export default class TilesSceneNode extends SceneNode {

    constructor(renderComponent: TileRenderComponent,
                private tileSetName: string) {
        super();
        this.renderComponent = renderComponent;
    }

    VRender(scene: Scene) {
        const renderComponent = this.renderComponent as TileRenderComponent;

        const tileWidth = renderComponent.tileWidth;
        const tileHeight = renderComponent.tileHeight;
        const zIndex = renderComponent.zIndex;
        const isRepeated = renderComponent.repeated;
        const cameraRect = scene.camera.getCameraRect(scene);
        const cameraX = ~~(cameraRect.x * zIndex);
        const cameraY = ~~(cameraRect.y * zIndex);
        const cameraOffsetX = cameraX < tileWidth ? tileWidth : cameraX;
        const cameraOffsetY = cameraY < tileHeight ? tileHeight : cameraY;

        const startX = ~~(cameraOffsetX / tileWidth - 1);
        const startY = ~~(cameraOffsetY / tileHeight - 1);
        const endX = ~~((cameraOffsetX + cameraRect.w) / tileWidth + 1);
        const endY = ~~((cameraOffsetY + cameraRect.h) / tileHeight + 1);

        const resources = ResourceMgr.getInstance();
        const ctx = resources.context;
        if (!ctx) {
            return;
        }

        const yTiles = renderComponent.tiles;
        for (let y = startY; y <= endY && (isRepeated || y < yTiles.length); ++y) {
            const xTiles = renderComponent.tiles[y % yTiles.length];
            if (xTiles) {
                for (let x = startX; x <= endX && (isRepeated || x < xTiles.length); ++x) {
                    const tiles = xTiles[x % xTiles.length];
                    if (tiles) {
                        for (let n = 0; n < tiles.length; ++n) {
                            const sprite = resources.getSprite(`${this.tileSetName}${tiles[n].id}`);
                            if (!sprite) {
                                continue;
                            }

                            ctx.drawImage(sprite.img,
                                sprite.rect.x, sprite.rect.y, sprite.rect.w, sprite.rect.h,
                                x * tileWidth - tileWidth / 2 - cameraX, y * tileHeight - tileHeight / 2 - cameraY, tileWidth, tileHeight);
                        }
                    }
                }
            }
        }
    }
}
