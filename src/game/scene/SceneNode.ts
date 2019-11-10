import SceneNodeProperties from "./SceneNodeProperties";
import Scene from "./Scene";
import RenderComponent from "../actors/components/RenderComponent";

export default class SceneNode {
    properties: SceneNodeProperties;
    childrenList: SceneNode[] = [];
    // parent?: SceneNode;
    renderComponent?: RenderComponent;

    constructor(properties: SceneNodeProperties | null = null) {
        this.properties = properties ? properties : new SceneNodeProperties(null, 0, 0);
    }

    VRender(scene: Scene): any {
        if (this.childrenList && this.childrenList.length > 0) {
            return this.childrenList.map((c) => c.VRender(scene));
        }
        return null;
    }
}
