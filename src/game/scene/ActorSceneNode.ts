import SceneNode from "./SceneNode";
import Scene from "./Scene";
import Rect from "../utils/Rect";
import {ActorRenderComponent} from "../actors/components/RenderComponent";
import Actor from "../actors/Actor";
import SceneNodeProperties from "./SceneNodeProperties";
import ResourceMgr from "../ResourceMgr";

export default class ActorSceneNode extends SceneNode {

    constructor(actor: Actor, x: number, y: number, w: number, h: number, renderComponent: ActorRenderComponent) {
        super(new SceneNodeProperties(actor, x, y, w, h));
        this.renderComponent = renderComponent;
    }

    VRender(scene: Scene) {
        const renderComponent = this.renderComponent as ActorRenderComponent;
        if (!renderComponent) {
            return;
        }

        if (!renderComponent.VIsVisible()) {
            return;
        }
        const actorImage = renderComponent.getCurrentImage();
        if (!actorImage) {
            return;
        }

        const cameraRect = scene.camera.getCameraRect(scene);
        const scaleX = renderComponent.isMirrored() ? -1 : 1;
        const scaleY = renderComponent.isYInverted() ? -1 : 1;
        const offsetX = actorImage.offsetX;
        const offsetY = actorImage.offsetY;
        const renderRect = new Rect(
            this.properties.position.x - this.properties.size.x / 2 + offsetX - cameraRect.x,
            this.properties.position.y - this.properties.size.y / 2 + offsetY - cameraRect.y,
            actorImage.width,
            actorImage.height
        );

        const resources = ResourceMgr.getInstance();
        const ctx = resources.context;
        if (!ctx) {
            return;
        }

        const sprite = resources.getSprite(actorImage.spriteName);
        if (!sprite) {
            return;
        }

        ctx.save();
        ctx.translate(scaleX < 0 ? resources.canvasWidth : 0, scaleY < 0 ? resources.canvasHeight : 0);
        ctx.scale(scaleX, scaleY);
        ctx.drawImage(sprite.img,
            sprite.rect.x, sprite.rect.y, sprite.rect.w, sprite.rect.h,
            // TODO: improve offsets and mirror animations
            //scaleX < 0 ? (cameraRect.w - renderRect.x - this.properties.size.x / 2) : renderRect.x, renderRect.y, renderRect.w, renderRect.h);
            scaleX < 0 ? (cameraRect.w - renderRect.x - renderRect.w) : renderRect.x, renderRect.y, renderRect.w, renderRect.h);
        ctx.restore();

        // return (
        //     <rect key={renderComponent.owner.id}
        //           x={renderRect.x}
        //           y={renderRect.y}
        //           width={renderRect.w}
        //           height={renderRect.h}
        //           transform={`scale(${scaleX} ${scaleY})`}
        //           fill={`url(#${actorImage.spriteName})`}
        //     />
        // );
    }
}
