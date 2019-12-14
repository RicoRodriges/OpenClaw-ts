import Actor from "../actors/Actor";
import PositionComponent from "../actors/components/PositionComponent";
import Point from "./Point";
import PhysicsComponent from "../actors/components/PhysicsComponent";
import GamePhysics, {ActorBodyDef, ActorFixtureDef} from "../GamePhysics";
import {ActorRenderComponent, TileId, TileRenderComponent} from "../actors/components/RenderComponent";
import AnimationComponent from "../actors/components/AnimationComponent";
import Animation from "../graphics/Animation";
import Frame from "../graphics/Frame";
import {AnimationTiles, CollisionTiles, LootInfo, SoundInfo, Tiles} from "../LevelData";
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
import TreasurePickupComponent from "../actors/components/loot/TreasurePickupComponent";
import LootComponent from "../actors/components/LootComponent";
import {PickupType} from "../enums/PickupType";
import ScoreComponent from "../actors/components/ScoreComponent";
import EventMgr from "../events/EventMgr";
import EventData_Request_New_Actor from "../events/EventData_Request_New_Actor";

export function createClawActor(physics: GamePhysics, spawnX: number, spawnY: number, animName: Animations): Actor {
    const anim = ResourceMgr.getInstance().getAnimation(animName);
    if (!anim) {
        console.error(`Animation ${animName} does not exist`);
        throw new Error(`Animation ${animName} does not exist`);
    }
    const claw = new Actor();
    const positionComponent = new PositionComponent(claw, new Point(spawnX, spawnY));
    claw.components.push(positionComponent);
    const renderComponent = new ActorRenderComponent(claw);
    claw.components.push(renderComponent);
    const animationComponent = new AnimationComponent(claw, renderComponent, anim);
    claw.components.push(animationComponent);
    const healthComponent = new HealthComponent(claw, 100, 100, true);
    claw.components.push(healthComponent);
    const controllableComponent = new ClawControllableComponent(claw, animationComponent, renderComponent, physics, healthComponent, [Sounds.claw_killEnemy], 0.4, 1800, [Animations.damage1, Animations.damage2], [Sounds.claw_damage1, Sounds.claw_damage2, Sounds.claw_damage3, Sounds.claw_damage4]);
    claw.components.push(controllableComponent);
    const collisionMask = CollisionFlag.CollisionFlag_EnemyAIAttack | CollisionFlag.CollisionFlag_Solid | CollisionFlag.CollisionFlag_Ground |
        CollisionFlag.CollisionFlag_Trigger | CollisionFlag.CollisionFlag_DamageAura | CollisionFlag.CollisionFlag_Pickup;
    const actorBodyDef = new ActorBodyDef();
    actorBodyDef.size.x = gameProperties.player.stayW;
    actorBodyDef.size.y = gameProperties.player.stayH;
    actorBodyDef.gravityScale = 4.0;
    actorBodyDef.friction = 0;
    actorBodyDef.density = 0.5;
    actorBodyDef.position.x = spawnX;
    actorBodyDef.position.y = spawnY;
    actorBodyDef.fixtureType = FixtureType.FixtureType_Controller;
    actorBodyDef.addFootSensor = true;
    actorBodyDef.collisionFlag = CollisionFlag.CollisionFlag_Controller;
    actorBodyDef.collisionMask = collisionMask;
    const physicsComponent = new PhysicsComponent(claw, true, gameProperties.player.maxJumpHeight, actorBodyDef, physics, controllableComponent);
    claw.components.push(physicsComponent);

    const scoreComponent = new ScoreComponent(claw, 0);
    claw.components.push(scoreComponent);

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

export function createOfficerActor(physics: GamePhysics, spawnX: number, spawnY: number, idleName: Animations, runName: Animations,
                                   attackName: Animations, speed: number, leftBorder: number, rightBorder: number, camera: CameraNode,
                                   damageAnimNames: Animations[], damageSounds: Sounds[],
                                   deathAnimName: Animations, deathSounds: Sounds[],
                                   attackSound: Sounds, agroSounds: Sounds[] = [],
                                   idleSounds: Sounds[] = [],
                                   loot: Map<PickupType, number>) {
    const resources = ResourceMgr.getInstance();
    const run = resources.getAnimation(runName);
    const idle = resources.getAnimation(idleName);
    const attack = resources.getAnimation(attackName);
    const deathAnim = resources.getAnimation(deathAnimName);
    const damageAnims = damageAnimNames.map((name) => resources.getAnimation(name)) as Animation[];
    if (!run || !idle || !attack || !deathAnim || damageAnims.some((a) => !a)) {
        console.error('Some of officer animations do not exist');
        throw new Error('Some of officer animations do not exist');
    }
    const officer = new Actor();
    const positionComponent = new PositionComponent(officer, new Point(spawnX, spawnY));
    officer.components.push(positionComponent);
    const renderComponent = new ActorRenderComponent(officer);
    officer.components.push(renderComponent);
    const animationComponent = new AnimationComponent(officer, renderComponent, run);
    officer.components.push(animationComponent);
    const collisionMask = CollisionFlag.CollisionFlag_ClawAttack | CollisionFlag.CollisionFlag_Solid | CollisionFlag.CollisionFlag_Ground | CollisionFlag.CollisionFlag_Trigger;
    const actorBodyDef = new ActorBodyDef();
    actorBodyDef.size.x = gameProperties.player.stayW;
    actorBodyDef.size.y = gameProperties.player.stayH;
    actorBodyDef.position.x = spawnX;
    actorBodyDef.position.y = spawnY;
    actorBodyDef.gravityScale = 0;
    actorBodyDef.friction = 0;
    actorBodyDef.density = 0.5;
    actorBodyDef.fixtureType = FixtureType.FixtureType_EnemyAI;
    actorBodyDef.makeCapsule = true;
    actorBodyDef.collisionFlag = CollisionFlag.CollisionFlag_DynamicActor;
    actorBodyDef.collisionMask = collisionMask;
    const physicsComponent = new PhysicsComponent(officer, false, 0, actorBodyDef, physics);
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
    const lootComponent = new LootComponent(officer, loot, healthComponent, positionComponent, physics);
    officer.components.push(lootComponent);

    enemyAIComponent.EnterBestState(true);
    return officer;
}

export function lootToMap(loot: LootInfo[]) {
    const map = new Map<PickupType, number>();
    loot.forEach((l) => map.set(l.type, l.count));
    return map;
}

export function createTreasureActor(x: number, y: number, w: number, h: number,
                                    type: Animations, physics: GamePhysics, isStatic: boolean,
                                    pickupSound: Sounds, scorePoints: number) {
    const resources = ResourceMgr.getInstance();
    const anim = resources.getAnimation(type);
    if (!anim) {
        console.error('Resources were not found');
        throw new Error('Resources were not found');
    }
    const treasure = new Actor();
    const positionComponent = new PositionComponent(treasure, new Point(x, y));
    treasure.components.push(positionComponent);
    const renderComponent = new ActorRenderComponent(treasure);
    treasure.components.push(renderComponent);
    const currentFrame = anim.frames.length === 1 ? 0 : (Math.round(Math.random() * 100) % anim.frames.length);
    const animationComponent = new AnimationComponent(treasure, renderComponent, anim, currentFrame);
    treasure.components.push(animationComponent);
    const triggerComponent = new TriggerComponent(treasure);
    treasure.components.push(triggerComponent);

    let speedX = 0.5 + ((Math.random() * 1000) % 100) / 50.0;
    const speedY = -(1 + ((Math.random() * 1000) % 100) / 50.0);

    if ((Math.random() * 100) % 2 === 1) {
        speedX *= -1;
    }

    const bodyDef = new ActorBodyDef();
    if (isStatic) {
        bodyDef.bodyType = BodyType.STATIC;
        bodyDef.makeSensor = true;
    } else {
        bodyDef.bodyType = BodyType.DYNAMIC;
        bodyDef.makeSensor = false;
    }

    bodyDef.fixtureType = FixtureType.FixtureType_Pickup;
    bodyDef.size.x = w;
    bodyDef.size.y = h;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    bodyDef.gravityScale = 0.8;
    bodyDef.setInitialSpeed = true;
    bodyDef.initialSpeed.x = speedX;
    bodyDef.initialSpeed.y = speedY;
    bodyDef.collisionFlag = CollisionFlag.CollisionFlag_Pickup;
    bodyDef.collisionMask = (CollisionFlag.CollisionFlag_Death | CollisionFlag.CollisionFlag_Ground | CollisionFlag.CollisionFlag_Solid);
    bodyDef.density = 10.0;
    bodyDef.friction = 0.18;
    bodyDef.restitution = 0.5;

    const fixtureDef = new ActorFixtureDef();
    fixtureDef.size.x = w;
    fixtureDef.size.y = h;
    fixtureDef.fixtureType = FixtureType.FixtureType_Trigger;
    fixtureDef.collisionFlag = CollisionFlag.CollisionFlag_Pickup;
    fixtureDef.collisionMask = CollisionFlag.CollisionFlag_Controller;
    fixtureDef.isSensor = true;
    bodyDef.fixtureList.push(fixtureDef);
    const physicsComponent = new PhysicsComponent(treasure, false, 0, bodyDef, physics);
    treasure.components.push(physicsComponent);
    const treasurePickupComponent = new TreasurePickupComponent(treasure, triggerComponent, pickupSound, scorePoints, physics, positionComponent);
    treasure.components.push(treasurePickupComponent);

    EventMgr.getInstance().VTriggerEvent(new EventData_Request_New_Actor(treasure));

    // if (!isStatic)
    // {
    //     const healthComponent = new HealthComponent(treasure, 1, 1);
    //     treasure.components.push(healthComponent);
    //     const destroyableComponent = new DestroyableComponent(treasure, animationComponent, healthComponent, physics, pickupSounds);
    //     treasure.components.push(destroyableComponent);
    // }

    return treasure;
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

export function createAnimation(tiles: AnimationTiles): Animation {
    const animationName = tiles.name;
    const frames = tiles.map.map((t) => {
        const w = tiles.w !== undefined ? tiles.w : t.w !== undefined ? t.w : 0;
        const h = tiles.h !== undefined ? tiles.h : t.h !== undefined ? t.h : 0;
        const offsetX = t.cx !== undefined ? (w / 2 - t.cx) : 0;
        const offsetY = t.cy !== undefined ? (h / 2 - t.cy) : 0;
        return new Frame(new Image(offsetX, offsetY, w, h, `${animationName}${t.id}`), t.delay);
    });
    return new Animation(animationName, frames);
}

export function loadAnimationWithSprites(tiles: AnimationTiles) {
    const animationName = tiles.name;
    const resources = ResourceMgr.getInstance();
    createSpriteDefinitions(tiles, animationName)
        .forEach((s) => {
            resources.loadSprite(s.id, s.src, s.src, s.rect.x, s.rect.y, s.rect.w, s.rect.h);
        });
    resources.addAnimation(animationName, createAnimation(tiles));
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
        collisionMask = CollisionFlag.CollisionFlag_DynamicActor;
    } else if (collisionFlag === CollisionFlag.CollisionFlag_EnemyAIAttack) {
        collisionMask = (CollisionFlag.CollisionFlag_Controller | CollisionFlag.CollisionFlag_InvisibleController);
    } else if (collisionFlag === CollisionFlag.CollisionFlag_Explosion) {
        collisionMask = (CollisionFlag.CollisionFlag_PowderKeg |
            CollisionFlag.CollisionFlag_DynamicActor |
            CollisionFlag.CollisionFlag_Controller |
            CollisionFlag.CollisionFlag_InvisibleController);
    }
    const triggerComponent = new TriggerComponent(damageActor);
    damageActor.components.push(triggerComponent);

    const areaDamageComponent = new AreaDamageComponent(damageActor, triggerComponent, null, damage, damageType, actor, damageDuration);
    damageActor.components.push(areaDamageComponent);

    const actorBodyDef = new ActorBodyDef();
    actorBodyDef.size.x = size.x;
    actorBodyDef.size.y = size.y;
    actorBodyDef.position.x = pos.x;
    actorBodyDef.position.y = pos.y;
    actorBodyDef.gravityScale = 0;
    actorBodyDef.friction = 0;
    actorBodyDef.density = 0;
    actorBodyDef.fixtureType = FixtureType.FixtureType_Trigger;
    actorBodyDef.collisionFlag = collisionFlag;
    actorBodyDef.collisionMask = collisionMask;
    actorBodyDef.makeSensor = true;
    const physicsComponent = new PhysicsComponent(damageActor, false, 0, actorBodyDef, physics);
    damageActor.components.push(physicsComponent);

    return damageActor;
}
