import React from "react";
import Actor from "./actors/Actor";
import GameView from "./GameView";
import GamePhysics from "./GamePhysics";
import EventMgr from "./events/EventMgr";
import {
    createAnimation,
    createClawActor,
    createCollisionObjectsAndScene,
    createSpriteDefinitions
} from "./utils/Converters";
import ActorController from "./ActorController";
import ScreenElementScene from "./user-interface/ScreenElementScene";
import ActorSceneNode from "./scene/ActorSceneNode";
import CameraNode from "./scene/CameraNode";
import SceneNode from "./scene/SceneNode";
import {IEventData} from "./events/IEventData";
import EventData_Actor_Start_Move from "./events/EventData_Actor_Start_Move";
import PhysicsComponent from "./actors/components/PhysicsComponent";
import levelData from "./LevelData";
import {ActorRenderComponent} from "./actors/components/RenderComponent";
import SvgSpriteDefinitionComponent, {SpriteDefinition} from "../components/SvgSpriteDefinitionComponent";

export default class GameLogic {
    actors: Actor[] = [];
    gameView?: GameView;
    gamePhysics?: GamePhysics;
    running = true;

    constructor() {
        EventMgr.getInstance().VAddListener((e) => this.onActorStartMoveDelegate(e), EventData_Actor_Start_Move.NAME);
    }

    VOnUpdate(diff: number) {
        if (this.running) {
            if (this.gamePhysics) {
                this.gamePhysics.VOnUpdate(diff);
                this.gamePhysics.VSyncVisibleScene();
            }
        }

        if (this.gameView) {
            this.gameView.VOnUpdate(diff);
        }

        if (this.running) {
            this.actors.forEach((a) => a.Update(diff));
        }

    }

    VLoadGame(w: number, h: number) {
        this.gamePhysics = new GamePhysics();
        //this.gamePhysics.addStaticBody(undefined, new Rect(0, 600, 600, 1));

        // Create sprite definitions
        let spriteDefinitions: SpriteDefinition[] = [];
        const tileDefinitions = createSpriteDefinitions(levelData.tiles, 'tile');
        spriteDefinitions = spriteDefinitions.concat(tileDefinitions);
        const idleAnimDefinitions = createSpriteDefinitions(levelData.player.idleAnim, 'claw_idle');
        spriteDefinitions = spriteDefinitions.concat(idleAnimDefinitions);

        // Create animations
        const idleAnim = createAnimation(levelData.player.idleAnim, 'claw_idle');

        // Create claw actor
        const claw = createClawActor(this.gamePhysics, levelData.player.spawnX, levelData.player.spawnY,
            levelData.player.maxJumpHeight, idleAnim);
        this.actors.push(claw);

        // Create claw scene node
        const renderComponent = claw.getComponent(ActorRenderComponent.NAME) as ActorRenderComponent;
        const actorSceneNode = new ActorSceneNode(claw, levelData.player.spawnX, levelData.player.spawnY, renderComponent);

        // Create tile physics objects and scene node
        const tilesSceneNode = createCollisionObjectsAndScene(this.gamePhysics, levelData.tiles, levelData.map);

        // Add all scene nodes to root
        const rootNode = new SceneNode();
        rootNode.childrenList.push(tilesSceneNode);
        rootNode.childrenList.push(actorSceneNode);

        const actorNodes = new Map<Actor, SceneNode>();
        actorNodes.set(claw, actorSceneNode);

        const screenElementScene = new ScreenElementScene(rootNode, new CameraNode(0, 0, w, h, claw), actorNodes);
        this.gameView = new GameView([screenElementScene], new ActorController(actorSceneNode), (
            <SvgSpriteDefinitionComponent key={1} sprites={spriteDefinitions} />
        ));

        // Register keyboard events
        document.body.addEventListener('keydown', (e: any) => this.gameView && this.gameView.onKeyDown(e));
        document.body.addEventListener('keyup', (e: any) => this.gameView && this.gameView.onKeyUp(e));
    }

    onActorStartMoveDelegate(e: IEventData) {
        const event = e as EventData_Actor_Start_Move;
        const physicsComponent = event.actor.getComponent(PhysicsComponent.NAME) as PhysicsComponent;
        if (physicsComponent) {
            physicsComponent.SetCurrentSpeed(event.move);
        }
    }
}
