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
import {SpriteDefinition} from "../components/SvgSpriteDefinitionComponent";
import ResourceMgr from "./ResourceMgr";
import EventData_Level_Loaded from "./events/EventData_Level_Loaded";
import TitleSceneNode from "./scene/TitleSceneNode";
import gameProperties from "./GameProperties";
import {Animations} from "./enums/Animations";

export default class GameLogic {
    actors: Actor[] = [];
    gameView?: GameView;
    gamePhysics?: GamePhysics;
    running = false;

    constructor() {
        EventMgr.getInstance().VAddListener((e) => this.onActorStartMoveDelegate(e), EventData_Actor_Start_Move.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onLevelLoadedDelegate(e), EventData_Level_Loaded.NAME);
    }

    VOnUpdate(diff: number) {
        if (!this.running) {
            if (ResourceMgr.getInstance().isResourcesLoaded()) {
                EventMgr.getInstance().VTriggerEvent(new EventData_Level_Loaded());
            }
        }

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
        const idleAnimDefinitions = createSpriteDefinitions(levelData.player.idleAnim, Animations.idle);
        spriteDefinitions = spriteDefinitions.concat(idleAnimDefinitions);
        const runAnimDefinitions = createSpriteDefinitions(levelData.player.runAnim, Animations.run);
        spriteDefinitions = spriteDefinitions.concat(runAnimDefinitions);
        const jumpAnimDefinitions = createSpriteDefinitions(levelData.player.jumpAnim, Animations.jump);
        spriteDefinitions = spriteDefinitions.concat(jumpAnimDefinitions);
        const fallAnimDefinitions = createSpriteDefinitions(levelData.player.fallAnim, Animations.fall);
        spriteDefinitions = spriteDefinitions.concat(fallAnimDefinitions);

        const resources = ResourceMgr.getInstance();
        spriteDefinitions.forEach((s) => {
            resources.loadSprite(s.id, s.src, s.src, s.rect.x, s.rect.y, s.rect.w, s.rect.h);
        });

        // Create animations
        const idleAnim = createAnimation(levelData.player.idleAnim, Animations.idle);
        resources.addAnimation(Animations.idle, idleAnim);
        const runAnim = createAnimation(levelData.player.runAnim, Animations.run);
        resources.addAnimation(Animations.run, runAnim);
        const jumpAnim = createAnimation(levelData.player.jumpAnim, Animations.jump);
        resources.addAnimation(Animations.jump, jumpAnim);
        const fallAnim = createAnimation(levelData.player.fallAnim, Animations.fall);
        resources.addAnimation(Animations.fall, fallAnim);

        // Create claw actor
        const claw = createClawActor(this.gamePhysics, levelData.player.spawnX, levelData.player.spawnY, idleAnim);
        this.actors.push(claw);

        // Create claw scene node
        const renderComponent = claw.getComponent(ActorRenderComponent.NAME) as ActorRenderComponent;
        const actorSceneNode = new ActorSceneNode(claw, levelData.player.spawnX, levelData.player.spawnY,
            gameProperties.player.stayW, gameProperties.player.stayH, renderComponent);

        // Create tile physics objects and scene node
        const tilesSceneNode = createCollisionObjectsAndScene(this.gamePhysics, levelData.tiles, levelData.map);

        // Add all scene nodes to root
        const rootNode = new SceneNode();
        rootNode.childrenList.push(tilesSceneNode);
        rootNode.childrenList.push(actorSceneNode);

        const actorNodes = new Map<Actor, SceneNode>();
        actorNodes.set(claw, actorSceneNode);

        // Create loading screen scene node
        const titleSceneNode = new TitleSceneNode('Loading...', 30, 200);

        // Create Loading screen scene
        // @ts-ignore
        const loadingScreenElementScene = new ScreenElementScene(titleSceneNode, null, new Map<Actor, SceneNode>());

        const screenElementScene = new ScreenElementScene(rootNode, new CameraNode(0, 0, w, h, claw), actorNodes);
        this.gameView = new GameView([loadingScreenElementScene], [screenElementScene], new ActorController(actorSceneNode));
    }

    onLevelLoadedDelegate(e: IEventData) {
        this.running = true;

        const view = this.gameView;
        if (view) {
            view.isLoading = false;
        }

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
