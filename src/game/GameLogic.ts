import Actor from "./actors/Actor";
import GameView from "./GameView";
import GamePhysics from "./GamePhysics";
import EventMgr from "./events/EventMgr";
import {
    createBgtilesAndScene,
    createClawActor,
    createCollisionObjectsAndScene,
    createHUDElementActor,
    createLevelObjectActor,
    createLootBoxActor,
    createOfficerActor,
    createSpriteDefinitions,
    createSpriteDefinitionsFromGridTiles,
    createTreasureActor,
    loadAllSounds,
    loadAnimationWithSprites,
    lootToMap, toHUDSceneNode
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
import GameProperties from "./GameProperties";
import {Animations} from "./enums/Animations";
import EventData_Actor_Attack from "./events/EventData_Actor_Attack";
import ClawControllableComponent from "./actors/components/ClawControllableComponent";
import PositionComponent from "./actors/components/PositionComponent";
import AudioMgr from "./audio/AudioMgr";
import {Sounds} from "./enums/Sounds";
import EventData_Request_New_Actor from "./events/EventData_Request_New_Actor";
import EventData_Request_Delete_Actor from "./events/EventData_Request_Delete_Actor";
import ScreenElementLoadingScreen from "./user-interface/ScreenElementLoadingScreen";
import EventData_Menu_Exit from "./events/EventData_Menu_Exit";
import ScreenElementMenu from "./user-interface/ScreenElementMenu";
import EventData_Request_Play_Sound from "./events/EventData_Request_Play_Sound";
import ScreenElementHud from "./user-interface/ScreenElementHud";
import HUDSceneNode from "./scene/HUDSceneNode";
import EventData_Claw_Died from "./events/EventData_Claw_Died";

export default class GameLogic {
    actors: Actor[] = [];
    gameView?: GameView;
    gamePhysics?: GamePhysics;
    running = false;
    isStopped = false;

    constructor() {
        EventMgr.getInstance().VAddListener((e) => this.onActorStartMoveDelegate(e), EventData_Actor_Start_Move.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onLevelLoadedDelegate(e), EventData_Level_Loaded.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onMenuExitDelegate(e), EventData_Menu_Exit.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onActorAttackDelegate(e), EventData_Actor_Attack.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onActorCreateDelegate(e), EventData_Request_New_Actor.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onActorDeleteDelegate(e), EventData_Request_Delete_Actor.NAME);
        EventMgr.getInstance().VAddListener((e) => this.onClawDeadDelegate(e), EventData_Claw_Died.NAME);
    }

    VOnUpdate(diff: number) {
        if (!this.running && !this.isStopped) {
            if (ResourceMgr.getInstance().isResourcesLoaded()) {
                EventMgr.getInstance().VTriggerEvent(new EventData_Level_Loaded());
            }
        }

        if (this.running && !this.isStopped) {
            if (this.gamePhysics) {
                this.gamePhysics.VOnUpdate(diff);
                this.gamePhysics.VSyncVisibleScene();
            }
        }

        if (this.gameView) {
            this.gameView.VOnUpdate(diff);
        }

        if (this.running && !this.isStopped) {
            this.actors.forEach((a) => a.Update(diff));
        }

    }

    VLoadGame(w: number, h: number) {
        this.gamePhysics = new GamePhysics();

        // Create sprite definitions
        const tileSetName = 'tile';
        const bgTileSetName = 'bgtile';
        const tileDefinitions = createSpriteDefinitions(levelData.tiles, tileSetName);
        const bgtileDefinitions = createSpriteDefinitionsFromGridTiles(levelData.bgtiles, bgTileSetName);

        const allTiles = [tileDefinitions, bgtileDefinitions];
        const resources = ResourceMgr.getInstance();
        allTiles.forEach((t) =>
            t.forEach((s) =>
                resources.loadSprite(s.id, s.src, s.src, s.rect.x, s.rect.y, s.rect.w, s.rect.h)
            )
        );

        // Create animations
        levelData.player.anims.forEach((anim) => loadAnimationWithSprites(anim));
        levelData.officer.anims.forEach((anim) => loadAnimationWithSprites(anim));
        levelData.treasureDef.forEach((t: TreasureDef) => t.anims.forEach((anim) => loadAnimationWithSprites(anim)));
        levelData.levelItems.forEach((anim) => loadAnimationWithSprites(anim));

        // Load treasure definitions
        resources.loadTreasures(levelData.treasureDef);

        // Load sounds
        loadAllSounds(levelData.sounds);
        // TODO: hack for lazy init
        AudioMgr.getInstance();

        // Create objects on the level
        levelData.objectInstances.forEach((o) => this.actors.push(createLevelObjectActor(o.x, o.y, o.obj)));

        // Create crate actors
        levelData.crateInstances.forEach((o) => {
            // TODO: remove w and h
            const crate = createLootBoxActor(o.spawnX, o.spawnY, 42, 42, Animations.crate, Animations.crate_destroying,
                this.gamePhysics as GamePhysics, [Sounds.crate_break1, Sounds.crate_break2], lootToMap(o.loot));
            this.actors.push(crate);
        });

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
                lootToMap(o.loot ? o.loot : undefined));
            this.actors.push(officerActor);
        });

        // Create static treasures
        levelData.treasureInstances.forEach((o) => {
            const t = resources.getTreasure(o.type);
            if (t && this.gamePhysics) {
                this.actors.push(createTreasureActor(o.x, o.y, t.w, t.h, o.type, t.anim, this.gamePhysics, true, t.sounds, t.score));
            }
        });

        // Create scene nodes for every actors
        const actorSceneNodes: ActorSceneNode[] = [];
        const actorNodes = new Map<Actor, SceneNode>();
        // TODO: refactor
        this.actors.forEach((a) => {
            const renderComponent = a.getComponent(ActorRenderComponent.NAME) as ActorRenderComponent;
            const positionComponent = a.getComponent(PositionComponent.NAME) as PositionComponent;
            if (renderComponent && positionComponent) {
                const actorSceneNode = new ActorSceneNode(a, positionComponent.position.x, positionComponent.position.y, renderComponent);
                actorSceneNodes.push(actorSceneNode);
                actorNodes.set(a, actorSceneNode);
            }
        });

        // Create tile physics objects and scene node
        const tilesSceneNode = createCollisionObjectsAndScene(this.gamePhysics, levelData.tiles, tileSetName, levelData.map);
        const bgtilesSceneNode = createBgtilesAndScene(levelData.bgtiles, 0.5, bgTileSetName);

        // Add all scene nodes to root
        const rootNode = new SceneNode();
        if (!GameProperties.debug) {
            rootNode.childrenList.push(bgtilesSceneNode);
        }
        rootNode.childrenList.push(tilesSceneNode);
        rootNode.childrenList.push(...actorSceneNodes);

        // Create main screen with main scene with scene nodes
        const screenElementScene = new ScreenElementScene(rootNode, camera, actorNodes);

        // Create loading screen
        const loadingSceneNode = new TitleSceneNode('Loading...', 30, 200);
        const loadingScreenElement = new ScreenElementLoadingScreen(loadingSceneNode, screenElementScene);

        // Create game menu
        const menuNodes = [
            new TitleSceneNode('Control:', 30, 30, 20),
            new TitleSceneNode('Keyboard arrows - move', 30, 60, 20),
            new TitleSceneNode('Ctrl - attack', 30, 90, 20),
            new TitleSceneNode('Space - jump', 30, 120, 20),
            new TitleSceneNode('Monolith Production owns all rights to this game.', 30, 200, 14),
            new TitleSceneNode('This project was created just for fun and education.', 30, 230, 14),
            new TitleSceneNode('The major part of implementation was borrowed from the OpenClaw project.', 30, 260, 14),
            new TitleSceneNode('Have fun!', 30, 290, 14),
            new TitleSceneNode('Press space to continue.', 30, 340, 30),
        ];
        const menuScreenElement = new ScreenElementMenu(menuNodes, screenElementScene);

        // Create death menu
        const deathMenuNodes = [
            new TitleSceneNode('I don\'t know how and why but', 30, 40, 30),
            new TitleSceneNode('        you are dead!        ', 30, 90, 40),
            new TitleSceneNode('  I hope you are happy now!  ', 30, 140, 30),
        ];
        const deathMenuScreenElement = new ScreenElementMenu(deathMenuNodes, screenElementScene);

        // Create HUD
        const uiTreasureActor = createHUDElementActor(22, 30, false, false, Animations.ui_treasure);
        this.actors.push(uiTreasureActor);
        const uiHealthActor = createHUDElementActor(-70, 20, true, false, Animations.ui_health);
        this.actors.push(uiHealthActor);

        const HUDNodes = new Map<string, SceneNode>();
        HUDNodes.set('score', toHUDSceneNode(uiTreasureActor));
        HUDNodes.set('health', toHUDSceneNode(uiHealthActor));
        const screenElementHud = new ScreenElementHud(HUDNodes, screenElementScene);

        this.gameView = new GameView(loadingScreenElement, menuScreenElement, deathMenuScreenElement, screenElementHud,
            [screenElementScene], new ActorController(actorNodes.get(claw) as ActorSceneNode));
    }

    onLevelLoadedDelegate(e: IEventData) {
        const view = this.gameView;
        if (view) {
            view.isInGameMenu = true;
            view.isLoading = false;
        }

        // Register keyboard events
        document.body.addEventListener('keydown', (e: any) => this.gameView && this.gameView.onKeyDown(e));
        document.body.addEventListener('keyup', (e: any) => this.gameView && this.gameView.onKeyUp(e));
    }

    onMenuExitDelegate(e: IEventData) {
        this.running = true;

        const view = this.gameView;
        if (view) {
            view.isInGameMenu = false;
        }
        EventMgr.getInstance().VTriggerEvent(new EventData_Request_Play_Sound(Sounds.level_music, true, 0.2));
    }

    onClawDeadDelegate(e: IEventData) {
        this.isStopped = true;

        const view = this.gameView;
        if (view) {
            view.isDeathMenu = true;
        }
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
                        const actorSceneNode = new ActorSceneNode(actor, positionComponent.position.x, positionComponent.position.y, renderComponent);
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
