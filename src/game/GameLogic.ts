import Actor from "./actors/Actor";
import GameView from "./GameView";
import GamePhysics from "./GamePhysics";
import EventMgr from "./events/EventMgr";
import {
    createClawActor,
    createCollisionObjectsAndScene,
    createOfficerActor,
    createSpriteDefinitions,
    loadAllSounds, loadAnimationWithSprites, lootToMap
} from "./utils/Converters";
import ActorController from "./ActorController";
import ScreenElementScene from "./user-interface/ScreenElementScene";
import ActorSceneNode from "./scene/ActorSceneNode";
import CameraNode from "./scene/CameraNode";
import SceneNode from "./scene/SceneNode";
import {IEventData} from "./events/IEventData";
import EventData_Actor_Start_Move from "./events/EventData_Actor_Start_Move";
import PhysicsComponent from "./actors/components/PhysicsComponent";
import levelData, {TreasureDef} from "./LevelData";
import {ActorRenderComponent} from "./actors/components/RenderComponent";
import ResourceMgr from "./ResourceMgr";
import EventData_Level_Loaded from "./events/EventData_Level_Loaded";
import TitleSceneNode from "./scene/TitleSceneNode";
import gameProperties from "./GameProperties";
import {Animations} from "./enums/Animations";
import EventData_Actor_Attack from "./events/EventData_Actor_Attack";
import ClawControllableComponent from "./actors/components/ClawControllableComponent";
import PositionComponent from "./actors/components/PositionComponent";
import AudioMgr from "./audio/AudioMgr";
import {Sounds} from "./enums/Sounds";
import EventData_Request_New_Actor from "./events/EventData_Request_New_Actor";
import EventData_Request_Delete_Actor from "./events/EventData_Request_Delete_Actor";

export default class GameLogic {
    actors: Actor[] = [];
    gameView?: GameView;
    gamePhysics?: GamePhysics;
    running = false;

    constructor() {
        EventMgr.getInstance().VAddListener((e) => this.onActorStartMoveDelegate(e), EventData_Actor_Start_Move.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onLevelLoadedDelegate(e), EventData_Level_Loaded.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onActorAttackDelegate(e), EventData_Actor_Attack.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onActorCreateDelegate(e), EventData_Request_New_Actor.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onActorDeleteDelegate(e), EventData_Request_Delete_Actor.NAME);
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
        const tileDefinitions = createSpriteDefinitions(levelData.tiles, 'tile');
        const resources = ResourceMgr.getInstance();
        tileDefinitions.forEach((s) => {
            resources.loadSprite(s.id, s.src, s.src, s.rect.x, s.rect.y, s.rect.w, s.rect.h);
        });

        // Create animations
        levelData.player.anims.forEach((anim) => loadAnimationWithSprites(anim));
        levelData.officer.anims.forEach((anim) => loadAnimationWithSprites(anim));
        levelData.treasureDef.forEach((t: TreasureDef) => t.anims.forEach((anim) => loadAnimationWithSprites(anim)));

        // Load treasure definitions
        resources.loadTreasures(levelData.treasureDef);

        // Load sounds
        loadAllSounds(levelData.sounds);
        // TODO: hack for lazy init
        AudioMgr.getInstance();

        // Create claw actor
        const claw = createClawActor(this.gamePhysics, levelData.player.spawnX, levelData.player.spawnY, Animations.idle);
        this.actors.push(claw);

        const camera = new CameraNode(0, 0, w, h, claw);

        // Create enemy actors
        levelData.officerInstances.forEach((o) => {
            const officerActor = createOfficerActor(this.gamePhysics as GamePhysics, o.spawnX, o.spawnY, Animations.idleOfficer,
                Animations.runOfficer, Animations.swordAttackOfficer, levelData.officer.speed, o.borderLeft, o.borderRight, camera,
                [Animations.damageOfficer], [Sounds.officer_damage1, Sounds.officer_damage2],
                Animations.deathOfficer, [Sounds.officer_killed1, Sounds.officer_killed2],
                Sounds.officer_swordAttack, [Sounds.officer_agro1, Sounds.officer_agro2], [Sounds.officer_idle1, Sounds.officer_idle2],
                lootToMap(o.loot));
            this.actors.push(officerActor);
        });

        // Create scene nodes for every actors
        const actorSceneNodes: ActorSceneNode[] = [];
        const actorNodes = new Map<Actor, SceneNode>();
        // TODO: refactor
        this.actors.forEach((a) => {
            const renderComponent = a.getComponent(ActorRenderComponent.NAME) as ActorRenderComponent;
            const positionComponent = a.getComponent(PositionComponent.NAME) as PositionComponent;
            if (renderComponent && positionComponent) {
                const actorSceneNode = new ActorSceneNode(a, positionComponent.position.x, positionComponent.position.y,
                    // TODO: remove this hack
                    gameProperties.player.stayW, gameProperties.player.stayH, renderComponent);
                actorSceneNodes.push(actorSceneNode);
                actorNodes.set(a, actorSceneNode);
            }
        });

        // Create tile physics objects and scene node
        const tilesSceneNode = createCollisionObjectsAndScene(this.gamePhysics, levelData.tiles, levelData.map);

        // Add all scene nodes to root
        const rootNode = new SceneNode();
        rootNode.childrenList.push(tilesSceneNode);
        rootNode.childrenList.push(...actorSceneNodes);

        // Create loading screen scene node
        const titleSceneNode = new TitleSceneNode('Loading...', 30, 200);

        // Create Loading screen scene
        // @ts-ignore
        const loadingScreenElementScene = new ScreenElementScene(titleSceneNode, null, new Map<Actor, SceneNode>());

        const screenElementScene = new ScreenElementScene(rootNode, camera, actorNodes);
        this.gameView = new GameView([loadingScreenElementScene], [screenElementScene], new ActorController(actorNodes.get(claw) as ActorSceneNode));
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

    private onActorAttackDelegate(e: IEventData) {
        const event = e as EventData_Actor_Attack;
        const controllableComponent = event.a.getComponent(ClawControllableComponent.NAME) as ClawControllableComponent;
        if (controllableComponent) {
            controllableComponent.OnAttack();
        }
    }

    private onActorCreateDelegate(e: IEventData) {
        const event = e as EventData_Request_New_Actor;
        const actor = event.a;
        if (actor) {
            this.actors.push(actor);
            // TODO: refactor
            const renderComponent = actor.getComponent(ActorRenderComponent.NAME) as ActorRenderComponent;
            if (renderComponent) {
                const positionComponent = actor.getComponent(PositionComponent.NAME) as PositionComponent;
                if (positionComponent) {
                    const physicComponent = actor.getComponent(PhysicsComponent.NAME) as PhysicsComponent;
                    if (physicComponent) {
                        const actorSceneNode = new ActorSceneNode(actor, positionComponent.position.x, positionComponent.position.y,
                            // TODO: remove this hack
                            physicComponent.actorBodyDef.size.x, physicComponent.actorBodyDef.size.y, renderComponent);
                        if (this.gameView) {
                            const ses = this.gameView.screenElements[0] as ScreenElementScene;
                            ses.actorNodes.set(actor, actorSceneNode);
                            ses.root.childrenList.push(actorSceneNode);
                        }
                    }
                }
            }
        }
    }

    private onActorDeleteDelegate(e: IEventData) {
        const event = e as EventData_Request_Delete_Actor;
        const actor = event.a;
        if (actor) {
            this.actors = this.actors.filter((a) => a !== actor);
            if (this.gamePhysics) {
                this.gamePhysics.VRemoveActor(actor);
            }
            // TODO: refactor
            const renderComponent = actor.getComponent(ActorRenderComponent.NAME) as ActorRenderComponent;
            if (renderComponent && this.gameView) {
                if (this.gameView) {
                    const ses = this.gameView.screenElements[0] as ScreenElementScene;
                    const node = ses.actorNodes.get(actor);
                    if (node) {
                        ses.root.childrenList = ses.root.childrenList.filter((n) => n !== node);
                        ses.actorNodes.delete(actor);
                    }
                }
            }
        }
    }
}
