import SceneNode from "./SceneNode";
import Scene from "./Scene";
import ResourceMgr from "../ResourceMgr";
import SceneNodeProperties from "./SceneNodeProperties";

export default class TitleSceneNode extends SceneNode {

    constructor(public text: string, x: number, y: number, public fontSize = 48, public fontName = 'serif') {
        super(new SceneNodeProperties(null, x, y, 0, 0));
    }

    VRender(scene: Scene) {
        const resources = ResourceMgr.getInstance();
        const ctx = resources.context;
        if (!ctx) {
            return;
        }

        ctx.font = `${this.fontSize}px ${this.fontName}`;
        ctx.fillText(this.text, this.properties.position.x, this.properties.position.y);
    }
}
