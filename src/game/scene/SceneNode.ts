import SceneNodeProperties from "./SceneNodeProperties";
import Scene from "./Scene";
import RenderComponent from "../actors/components/RenderComponent";

export default class SceneNode {
    properties: SceneNodeProperties;
    childrenList: SceneNode[] = [];
    // parent?: SceneNode;
    renderComponent?: RenderComponent;

    constructor(properties: SceneNodeProperties | null = null) {
        this.properties = properties ? properties : new SceneNodeProperties(null, 0, 0, 0, 0);
    }

    VRender(scene: Scene) {
        if (this.childrenList && this.childrenList.length > 0) {
            this.childrenList.forEach((c) => c.VRender(scene));
        }
    }
}
