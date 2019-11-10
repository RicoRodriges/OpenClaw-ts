import SceneNode from "./SceneNode";
import CameraNode from "./CameraNode";
import Actor from "../actors/Actor";
import {IEventData} from "../events/IEventData";
import EventData_Move_Actor from "../events/EventData_Move_Actor";
import EventMgr from "../events/EventMgr";

export default class Scene {
    root: SceneNode;
    camera: CameraNode;
    actorNodes = new Map<Actor, SceneNode>();

    constructor(root: SceneNode, camera: CameraNode, actorNodes: Map<Actor, SceneNode>) {
        this.root = root;
        this.camera = camera;
        this.actorNodes = actorNodes;
        EventMgr.getInstance().VAddListener((e) => this.onActorMoveDelegate(e), EventData_Move_Actor.NAME);
    }

    onActorMoveDelegate(e: IEventData) {
        const event = e as EventData_Move_Actor;
        const node = this.actorNodes.get(event.actor);
        if (node) {
            node.properties.position.x = event.position.x;
            node.properties.position.y = event.position.y;
        }
    }


}
