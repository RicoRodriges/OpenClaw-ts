import SceneNode from "./SceneNode";
import Scene from "./Scene";
import Rect from "../utils/Rect";
import {HUDRenderComponent} from "../actors/components/RenderComponent";
import Actor from "../actors/Actor";
import SceneNodeProperties from "./SceneNodeProperties";
import ResourceMgr from "../ResourceMgr";

export default class HUDSceneNode extends SceneNode {

    constructor(actor: Actor, x: number, y: number, renderComponent: HUDRenderComponent) {
        super(new SceneNodeProperties(actor, x, y));
        this.renderComponent = renderComponent;
    }

    VRender(scene: Scene) {
        const renderComponent = this.renderComponent as HUDRenderComponent;
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
        const offsetX = scaleX > 0 ? actorImage.offsetX : -actorImage.offsetX;
        const offsetY = scaleY > 0 ? actorImage.offsetY : -actorImage.offsetY;
        const renderRect = new Rect(
            Math.floor(this.properties.position.x - actorImage.width / 2 + offsetX),
            Math.floor(this.properties.position.y - actorImage.height / 2 + offsetY),
            actorImage.width,
            actorImage.height
        );
        if (renderComponent.isRight) {
            renderRect.x += cameraRect.w;
        }
        if (renderComponent.isBottom) {
            renderRect.y += cameraRect.h;
        }

        const resources = ResourceMgr.getInstance();
        const ctx = resources.context;
        if (!ctx) {
            return;
        }

        const sprite = resources.getSprite(actorImage.spriteName);
        if (!sprite) {
            return;
        }

        const canvasTransformation = scaleX < 0 || scaleY < 0;
        if (canvasTransformation) {
            ctx.save();
            ctx.scale(scaleX, scaleY);
        }
        ctx.drawImage(sprite.img,
            sprite.rect.x, sprite.rect.y, sprite.rect.w, sprite.rect.h,
            scaleX < 0 ? -(renderRect.x + renderRect.w) : renderRect.x,
            scaleY < 0 ? -(renderRect.y + renderRect.h) : renderRect.y,
            renderRect.w, renderRect.h);
        if (canvasTransformation) {
            ctx.restore();
        }
    }
}
