import SceneNode from "./SceneNode";
import Scene from "./Scene";
import * as React from "react";
import {TileRenderComponent} from "../actors/components/RenderComponent";

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

        const startX = cameraOffsetX / tileWidth - 1;
        const startY = cameraOffsetY / tileHeight - 1;
        const endX = (cameraOffsetX + cameraRect.w) / tileWidth + 1;
        const endY = (cameraOffsetY + cameraRect.h) / tileHeight + 1;

        const res = [];
        for (let y = startY; y <= endY && y < renderComponent.tiles.length; ++y) {
            if (renderComponent.tiles[y]) {
                for (let x = startX; x <= endX && x < renderComponent.tiles[y].length; ++x) {
                    if (renderComponent.tiles[y][x]) {
                        for (let n = 0; n < renderComponent.tiles[y][x].length; ++n) {
                            res.push(
                                <rect key={`${x}_${y}`}
                                      x={x * tileWidth + cameraRect.x}
                                      y={y * tileHeight + cameraRect.y}
                                      width={tileWidth}
                                      height={tileHeight}
                                    //transform={`scale(${scaleX} ${scaleY})`}
                                      fill={`url(#tile${renderComponent.tiles[y][x][n].id})`}
                                />
                            );
                        }
                    }
                }
            }
        }
        return res;
    }
}
