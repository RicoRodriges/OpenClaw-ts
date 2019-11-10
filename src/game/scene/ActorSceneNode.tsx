import SceneNode from "./SceneNode";
import Scene from "./Scene";
import Rect from "../utils/Rect";
import * as React from "react";
import {ActorRenderComponent} from "../actors/components/RenderComponent";
import Actor from "../actors/Actor";
import SceneNodeProperties from "./SceneNodeProperties";

export default class ActorSceneNode extends SceneNode {

    constructor(actor: Actor, x: number, y: number, renderComponent: ActorRenderComponent) {
        super(new SceneNodeProperties(actor, x, y));
        this.renderComponent = renderComponent;
    }

    VRender(scene: Scene) {
        const renderComponent = this.renderComponent as ActorRenderComponent;
        if (!renderComponent) {
            return null;
        }

        if (!renderComponent.VIsVisible()) {
            return null;
        }
        const actorImage = renderComponent.getCurrentImage();
        if (!actorImage) {
            return null;
        }

        const cameraRect = scene.camera.getCameraRect(scene);
        const scaleX = renderComponent.isMirrored() ? -1 : 1;
        const scaleY = renderComponent.isYInverted() ? -1 : 1;
        const offsetX = actorImage.offsetX;
        const offsetY = actorImage.offsetY;
        const renderRect = new Rect(
            this.properties.position.x - actorImage.width / 2 + offsetX - cameraRect.x,
            this.properties.position.y - actorImage.height / 2 + offsetY - cameraRect.y,
            actorImage.width,
            actorImage.height
        );

        return (
            <rect key={renderComponent.owner.id}
                  x={renderRect.x}
                  y={renderRect.y}
                  width={renderRect.w}
                  height={renderRect.h}
                  transform={`scale(${scaleX} ${scaleY})`}
                  fill={`url(#${actorImage.svgPattern})`}
            />
        );
    }
}
