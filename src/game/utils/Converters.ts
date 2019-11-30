import Actor from "../actors/Actor";
import PositionComponent from "../actors/components/PositionComponent";
import Point from "./Point";
import PhysicsComponent from "../actors/components/PhysicsComponent";
import GamePhysics from "../GamePhysics";
import {ActorRenderComponent, TileId, TileRenderComponent} from "../actors/components/RenderComponent";
import AnimationComponent from "../actors/components/AnimationComponent";
import Animation from "../graphics/Animation";
import Frame from "../graphics/Frame";
import {AnimationTiles, CollisionTiles, SoundInfo, Tiles} from "../LevelData";
import {SpriteDefinition} from "../../components/SvgSpriteDefinitionComponent";
import Rect from "./Rect";
import Image from "../graphics/Image";
import TilesSceneNode from "../scene/TilesSceneNode";
import gameProperties from "../GameProperties";
import ClawControllableComponent from "../actors/components/ClawControllableComponent";
import PatrolEnemyAIStateComponent from "../actors/components/enemy/PatrolEnemyAIStateComponent";
import ResourceMgr from "../ResourceMgr";
import EnemyAIComponent from "../actors/components/enemy/EnemyAIComponent";
import AttackAIStateComponent from "../actors/components/enemy/AttackAIStateComponent";
import {Sounds} from "../enums/Sounds";
import {FixtureType} from "../enums/FixtureType";
import CameraNode from "../scene/CameraNode";
import {CollisionFlag} from "../enums/CollisionFlag";
import {DamageType} from "../enums/DamageType";
import {BodyType} from "../enums/BodyType";
import TriggerComponent from "../actors/components/TriggerComponent";
import AreaDamageComponent from "../actors/components/loot/AreaDamageComponent";
import TakeDamageAIStateComponent from "../actors/components/enemy/TakeDamageAIStateComponent";
import HealthComponent from "../actors/components/HealthComponent";
import {Animations} from "../enums/Animations";

export function createClawActor(physics: GamePhysics, spawnX: number, spawnY: number, anim: Animation): Actor {
    const claw = new Actor();
    const positionComponent = new PositionComponent(claw, new Point(spawnX, spawnY));
    claw.components.push(positionComponent);
    const animationComponent = new AnimationComponent(claw, anim);
    claw.components.push(animationComponent);
    const renderComponent = new ActorRenderComponent(claw);
    claw.components.push(renderComponent);
    const healthComponent = new HealthComponent(claw, 100, 100, true);
    claw.components.push(healthComponent);
    const controllableComponent = new ClawControllableComponent(claw, animationComponent, renderComponent, physics, healthComponent, [Sounds.claw_killEnemy], 0.4, 1800, [Animations.damage1, Animations.damage2], [Sounds.claw_damage1, Sounds.claw_damage2, Sounds.claw_damage3, Sounds.claw_damage4]);
    claw.components.push(controllableComponent);
    const collisionMask = CollisionFlag.CollisionFlag_EnemyAIAttack | CollisionFlag.CollisionFlag_Solid | CollisionFlag.CollisionFlag_Ground |
    CollisionFlag.CollisionFlag_Trigger | CollisionFlag.CollisionFlag_DamageAura;
    const physicsComponent = new PhysicsComponent(claw, true, false, true, gameProperties.player.maxJumpHeight, gameProperties.player.stayW, gameProperties.player.stayH,
        4.0, 0.0, 0.5, physics, FixtureType.FixtureType_Controller, controllableComponent, true, false,
        CollisionFlag.CollisionFlag_Controller, collisionMask);
    claw.components.push(physicsComponent);

    //pClawActor->LinkEndChild(CreateCollisionComponent(40, 100));
    //pClawActor->LinkEndChild(ActorTemplates::CreateFollowableComponent(Point(-5, -80), "/GAME/IMAGES/EXCLAMATION/*", ""));

    // TiXmlElement* pScoreComponent = new TiXmlElement("ScoreComponent");
    // XML_ADD_TEXT_ELEMENT("Score", "0", pScoreComponent);
    // pClawActor->LinkEndChild(pScoreComponent);
    //
    // TiXmlElement* pLifeComponent = new TiXmlElement("LifeComponent");
    // XML_ADD_TEXT_ELEMENT("Lives", "0", pLifeComponent);
    // pClawActor->LinkEndChild(pLifeComponent);
    //
    // TiXmlElement* pHealthComponent = new TiXmlElement("HealthComponent");
    // XML_ADD_TEXT_ELEMENT("Health", "0", pHealthComponent);
    // XML_ADD_TEXT_ELEMENT("MaxHealth", "100", pHealthComponent);
    // pClawActor->LinkEndChild(pHealthComponent);
    //
    // TiXmlElement* pAmmoComponent = new TiXmlElement("AmmoComponent");
    // XML_ADD_TEXT_ELEMENT("Pistol", "0", pAmmoComponent);
    // XML_ADD_TEXT_ELEMENT("Magic", "0", pAmmoComponent);
    // XML_ADD_TEXT_ELEMENT("Dynamite", "0", pAmmoComponent);
    // pClawActor->LinkEndChild(pAmmoComponent);
    //
    // TiXmlElement* pPowerupComponent = new TiXmlElement("PowerupComponent");
    // pClawActor->LinkEndChild(pPowerupComponent);

    return claw;
}

export function createOfficerActor(physics: GamePhysics, spawnX: number, spawnY: number, idle: Animation, run: Animation,
                                   attack: Animation, speed: number, leftBorder: number, rightBorder: number, camera: CameraNode,
                                   damageAnims: Animation[], damageSounds: Sounds[],
                                   deathAnim: Animation, deathSounds: Sounds[],
                                   attackSound: Sounds, agroSounds: Sounds[] = [],
                                   idleSounds: Sounds[] = []) {
    const officer = new Actor();
    const positionComponent = new PositionComponent(officer, new Point(spawnX, spawnY));
    officer.components.push(positionComponent);
    const animationComponent = new AnimationComponent(officer, run);
    officer.components.push(animationComponent);
    const renderComponent = new ActorRenderComponent(officer);
    officer.components.push(renderComponent);
    const collisionMask = CollisionFlag.CollisionFlag_ClawAttack | CollisionFlag.CollisionFlag_Solid | CollisionFlag.CollisionFlag_Ground | CollisionFlag.CollisionFlag_Trigger;
    const physicsComponent = new PhysicsComponent(officer, false, false, false, 0, gameProperties.player.stayW, gameProperties.player.stayH,
        0, 0.0, 0.5, physics, FixtureType.FixtureType_EnemyAI, null, false, true,
        CollisionFlag.CollisionFlag_DynamicActor, collisionMask);
    officer.components.push(physicsComponent);
    const healthComponent = new HealthComponent(officer, 15, 15);
    officer.components.push(healthComponent);
    const enemyAIComponent = new EnemyAIComponent(officer, healthComponent, deathAnim, deathSounds, physicsComponent, animationComponent, positionComponent, Sounds.splash);
    officer.components.push(enemyAIComponent);
    const patrolComponent = new PatrolEnemyAIStateComponent(officer, physics, positionComponent, animationComponent, renderComponent, enemyAIComponent, speed, leftBorder, rightBorder, idle, run, camera, idleSounds);
    officer.components.push(patrolComponent);
    const attackAIStateComponent = new AttackAIStateComponent(officer, attack, 3, positionComponent, animationComponent, renderComponent, enemyAIComponent, physics, agroSounds, attackSound);
    officer.components.push(attackAIStateComponent);
    const takeDamageAIStateComponent = new TakeDamageAIStateComponent(officer, damageAnims, damageSounds, animationComponent, enemyAIComponent);
    officer.components.push(takeDamageAIStateComponent);

    enemyAIComponent.EnterBestState(true);
    return officer;
}

export function createSpriteDefinitions(tiles: Tiles, spriteNamePrefix: string): SpriteDefinition[] {
    const src = tiles.src;
    const srcWidth = tiles.srcWidth;
    const srcHeight = tiles.srcHeight;
    return tiles.map.map((t) => {
        const w = tiles.w !== undefined ? tiles.w : t.w !== undefined ? t.w : 0;
        const h = tiles.h !== undefined ? tiles.h : t.h !== undefined ? t.h : 0;
        return {
            id: `${spriteNamePrefix}${t.id}`,
            rect: new Rect(t.x, t.y, w, h),
            srcWidth: srcWidth,
            srcHeight: srcHeight,
            src: src
        };
    });
}

export function createAnimation(tiles: AnimationTiles, animationName: string): Animation {
    const frames = tiles.map.map((t) => {
        const w = tiles.w !== undefined ? tiles.w : t.w !== undefined ? t.w : 0;
        const h = tiles.h !== undefined ? tiles.h : t.h !== undefined ? t.h : 0;
        const offsetX = t.cx !== undefined ? (w / 2 - t.cx) : 0;
        const offsetY = t.cy !== undefined ? (h / 2 - t.cy) : 0;
        return new Frame(new Image(offsetX, offsetY, w, h, `${animationName}${t.id}`), t.delay);
    });
    return new Animation(animationName, frames);
}

export function createCollisionObjectsAndScene(physics: GamePhysics, tiles: CollisionTiles,
                                               mapElement: (number | null)[][] | (number | null)[][][]): TilesSceneNode {
    const tilesMap: TileId[][][] = [];
    for (let y = 0; y < mapElement.length; ++y) {
        if (mapElement[y]) {
            for (let x = 0; x < mapElement[y].length; ++x) {
                if (mapElement[y][x] !== null) {
                    if (Array.isArray(mapElement[y][x])) {
                        const arr = mapElement[y][x] as (number | null)[];
                        for (let n = 0; n < arr.length; ++n) {
                            const val = arr[n];
                            if (val !== null) {
                                setElement(val, y, x, tilesMap);
                                createPhysicsObjectFromTile(val, y, x, tiles, physics);
                            }
                        }
                    } else {
                        const val = mapElement[y][x] as number;
                        setElement(val, y, x, tilesMap);
                        createPhysicsObjectFromTile(val, y, x, tiles, physics);
                    }
                }
            }
        }
    }
    const tileRenderComponent = new TileRenderComponent(new Actor(), tiles.w || 0, tiles.h || 0, tilesMap);
    return new TilesSceneNode(tileRenderComponent);
}

function setElement(val: number, y: number, x: number, arr: TileId[][][]) {
    let arrY = arr[y];
    if (!arrY) {
        arrY = [];
        arr[y] = arrY;
    }
    let arrX = arrY[x];
    if (!arrX) {
        arrX = [{id: val}];
        arrY[x] = arrX;
    } else {
        arrX.push({id: val});
    }
}

function createPhysicsObjectFromTile(tileId: number, y: number, x: number, tiles: CollisionTiles, physics: GamePhysics) {
    const tile = tiles.map.find((t) => t.id === tileId);
    if (tile && tile.collisions && tile.collisions.length > 0) {
        const tileWidth = tiles.w || tile.w || 0;
        const tileHeight = tiles.h || tile.h || 0;
        tile.collisions.forEach((c) => {
            const worldX = x * tileWidth + c.x;
            const worldY = y * tileHeight + c.y;
            physics.addStaticBody(undefined, new Rect(worldX, worldY, c.w, c.h));
        });
    }
}

export function loadAllSounds(sounds: SoundInfo[]) {
    const resources = ResourceMgr.getInstance();
    sounds.forEach((s) => resources.loadSound(s.name, s.src));
}

export function createAreaDamageActor(pos: Point, size: Point, damage: number, collisionFlag: CollisionFlag,
                                      damageType: DamageType, actor: Actor, physics: GamePhysics, damageDuration: number) {
    const damageActor = new Actor();

    const positionComponent = new PositionComponent(damageActor, pos);
    damageActor.components.push(positionComponent);

    let collisionMask = 0;
    if (collisionFlag === CollisionFlag.CollisionFlag_ClawAttack) {
        collisionMask = (CollisionFlag.CollisionFlag_Crate | CollisionFlag.CollisionFlag_DynamicActor);
    } else if (collisionFlag === CollisionFlag.CollisionFlag_EnemyAIAttack) {
        collisionMask = (CollisionFlag.CollisionFlag_Controller | CollisionFlag.CollisionFlag_InvisibleController);
    } else if (collisionFlag === CollisionFlag.CollisionFlag_Explosion) {
        collisionMask = (CollisionFlag.CollisionFlag_Crate |
            CollisionFlag.CollisionFlag_PowderKeg |
            CollisionFlag.CollisionFlag_DynamicActor |
            CollisionFlag.CollisionFlag_Controller |
            CollisionFlag.CollisionFlag_InvisibleController);
    }
    const triggerComponent = new TriggerComponent(damageActor);
    damageActor.components.push(triggerComponent);

    const areaDamageComponent = new AreaDamageComponent(damageActor, triggerComponent, null, damage, damageType, actor, damageDuration);
    damageActor.components.push(areaDamageComponent);

    const physicsComponent = new PhysicsComponent(damageActor, false, false, false, 0, size.x, size.y, 0, 0, 0,
        physics, FixtureType.FixtureType_Trigger, null, false, false, collisionFlag, collisionMask, BodyType.DYNAMIC, true);
    damageActor.components.push(physicsComponent);

    return damageActor;
}
