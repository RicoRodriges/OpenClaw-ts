import SceneNode from "./SceneNode";
import Scene from "./Scene";
import {TileRenderComponent} from "../actors/components/RenderComponent";
import ResourceMgr from "../ResourceMgr";

export default class TilesSceneNode extends SceneNode {

    constructor(renderComponent: TileRenderComponent) {
        super();
        this.renderComponent = renderComponent;
    }

    VRender(scene: Scene) {
        const renderComponent = this.renderComponent as TileRenderComponent;

        const tileWidth = renderComponent.tileWidth;
        const tileHeight = renderComponent.tileHeight;
        const cameraRect = scene.camera.getCameraRect(scene);
        const cameraOffsetX = cameraRect.x < tileWidth ? tileWidth : cameraRect.x;
        const cameraOffsetY = cameraRect.y < tileHeight ? tileHeight : cameraRect.y;

        const startX = Math.floor(cameraOffsetX / tileWidth - 1);
        const startY = Math.floor(cameraOffsetY / tileHeight - 1);
        const endX = Math.floor((cameraOffsetX + cameraRect.w) / tileWidth + 1);
        const endY = Math.floor((cameraOffsetY + cameraRect.h) / tileHeight + 1);

        const resources = ResourceMgr.getInstance();
        const ctx = resources.context;
        if (!ctx) {
            return;
        }

        // const res = [];
        for (let y = startY; y <= endY && y < renderComponent.tiles.length; ++y) {
            if (renderComponent.tiles[y]) {
                for (let x = startX; x <= endX && x < renderComponent.tiles[y].length; ++x) {
                    if (renderComponent.tiles[y][x]) {
                        for (let n = 0; n < renderComponent.tiles[y][x].length; ++n) {
                            const sprite = resources.getSprite(`tile${renderComponent.tiles[y][x][n].id}`);
                            if (!sprite) {
                                continue;
                            }

                            ctx.drawImage(sprite.img,
                                sprite.rect.x, sprite.rect.y, sprite.rect.w, sprite.rect.h,
                                x * tileWidth - tileWidth / 2 - cameraRect.x, y * tileHeight - tileHeight / 2 - cameraRect.y, tileWidth, tileHeight);
                            //
                            //
                            // res.push(
                            //     <rect key={`${x}_${y}`}
                            //           x={x * tileWidth + cameraRect.x}
                            //           y={y * tileHeight + cameraRect.y}
                            //           width={tileWidth}
                            //           height={tileHeight}
                            //         //transform={`scale(${scaleX} ${scaleY})`}
                            //           fill={`url(#tile${renderComponent.tiles[y][x][n].id})`}
                            //     />
                            // );
                        }
                    }
                }
            }
        }
        // return res;
    }
}
