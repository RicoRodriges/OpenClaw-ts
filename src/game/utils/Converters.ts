import Actor from "../actors/Actor";
import PositionComponent from "../actors/components/PositionComponent";
import Point from "./Point";
import PhysicsComponent from "../actors/components/PhysicsComponent";
import GamePhysics, {ActorBodyDef, ActorFixtureDef} from "../GamePhysics";
import {
    ActorRenderComponent,
    HUDRenderComponent,
    TileId,
    TileRenderComponent
} from "../actors/components/RenderComponent";
import AnimationComponent from "../actors/components/AnimationComponent";
import Animation from "../graphics/Animation";
import Frame from "../graphics/Frame";
import {AnimationTiles, CollisionTiles, GridTile, LootInfo, SoundInfo, SpriteDefinition, Tiles} from "../LevelData";
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
import DestroyableComponent from "../actors/components/DestroyableComponent";
import HUDSceneNode from "../scene/HUDSceneNode";
import SoundPickupComponent from "../actors/components/loot/SoundPickupComponent";
import FinishLevelPickupComponent from "../actors/components/loot/FinishLevelPickupComponent";

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
    const controllableComponent = new ClawControllableComponent(claw, animationComponent, renderComponent, physics, healthComponent,
        [Sounds.claw_killEnemy, Sounds.claw_killEnemy2, Sounds.claw_killEnemy3],
        0.4, 1800, [Animations.damage1, Animations.damage2], [Sounds.claw_damage1, Sounds.claw_damage2, Sounds.claw_damage3, Sounds.claw_damage4]);
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

export function lootToMap(loot: LootInfo[] | undefined) {
    const map = new Map<PickupType, number>();
    if (loot) {
        loot.forEach((l) => map.set(l.type, l.count));
    } else {
        [PickupType.RING, PickupType.GOLD_BAR, PickupType.SCEPTER, PickupType.SKULL, PickupType.GECKO,
            PickupType.CROWN, PickupType.CROSS, PickupType.CHALICE, PickupType.COIN].forEach((t) => {
            const c = ~~(Math.random() * 1000) % 4;
            if (c) {
                map.set(t, c);
            }
        })
    }
    return map;
}

export function mergeLoot(dest: Map<PickupType, number>, source: Map<PickupType, number>) {
    let score = 0;
    const res = ResourceMgr.getInstance();
    source.forEach((c, t) => {
        const def = res.getTreasure(t);
        if (def) {
            const prew = dest.get(t) || 0;
            dest.set(t, prew + c);
            score += def.score * c;
        }
    });
    return score;
}

export function createTreasureActor(x: number, y: number, w: number, h: number, type: PickupType,
                                    animName: Animations, physics: GamePhysics, isStatic: boolean,
                                    pickupSound: Sounds, scorePoints: number) {
    const resources = ResourceMgr.getInstance();
    const anim = resources.getAnimation(animName);
    if (!anim) {
        console.error('Resources were not found');
        throw new Error('Resources were not found');
    }
    const treasure = new Actor();
    const positionComponent = new PositionComponent(treasure, new Point(x, y));
    treasure.components.push(positionComponent);
    const renderComponent = new ActorRenderComponent(treasure);
    treasure.components.push(renderComponent);
    const currentFrame = anim.frames.length === 1 ? 0 : (~~(Math.random() * 100) % anim.frames.length);
    const animationComponent = new AnimationComponent(treasure, renderComponent, anim, currentFrame);
    treasure.components.push(animationComponent);
    const triggerComponent = new TriggerComponent(treasure);
    treasure.components.push(triggerComponent);

    let speedX = 0.5 + ((Math.random() * 1000) % 100) / 20.0;
    const speedY = -(1 + ((Math.random() * 1000) % 100) / 20.0);

    if (Math.random() > 0.5) {
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
    const treasurePickupComponent = new TreasurePickupComponent(treasure, triggerComponent, pickupSound, scorePoints, type, physics, positionComponent);
    treasure.components.push(treasurePickupComponent);

    // if (!isStatic)
    // {
    //     const healthComponent = new HealthComponent(treasure, 1, 1);
    //     treasure.components.push(healthComponent);
    //     const destroyableComponent = new DestroyableComponent(treasure, animationComponent, healthComponent, physics, pickupSounds);
    //     treasure.components.push(destroyableComponent);
    // }

    return treasure;
}

export function createLevelFinishActor(x: number, y: number, animName: Animations,
                                       pickupSound: Sounds, physics: GamePhysics) {
    const resources = ResourceMgr.getInstance();
    const anim = resources.getAnimation(animName);
    if (!anim) {
        console.error('Resources were not found');
        throw new Error('Resources were not found');
    }
    const actor = new Actor();
    const positionComponent = new PositionComponent(actor, new Point(x, y));
    actor.components.push(positionComponent);
    const renderComponent = new ActorRenderComponent(actor);
    actor.components.push(renderComponent);
    const animationComponent = new AnimationComponent(actor, renderComponent, anim);
    actor.components.push(animationComponent);
    const triggerComponent = new TriggerComponent(actor);
    actor.components.push(triggerComponent);

    const bodyDef = new ActorBodyDef();
    bodyDef.bodyType = BodyType.STATIC;
    bodyDef.makeSensor = true;
    bodyDef.fixtureType = FixtureType.FixtureType_Trigger;
    bodyDef.size.x = anim.frames[0].image.width;
    bodyDef.size.y = anim.frames[0].image.height;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    bodyDef.gravityScale = 0;
    bodyDef.collisionFlag = CollisionFlag.CollisionFlag_Pickup;
    bodyDef.collisionMask = CollisionFlag.CollisionFlag_Controller;
    const physicsComponent = new PhysicsComponent(actor, false, 0, bodyDef, physics);
    actor.components.push(physicsComponent);
    const finishLevelPickupComponent = new FinishLevelPickupComponent(actor, triggerComponent, pickupSound);
    actor.components.push(finishLevelPickupComponent);
    return actor;
}

export function createSoundPickupActor(x: number, y: number, w: number, h: number, pickupSound: Sounds, physics: GamePhysics) {
    const pickupActor = new Actor();
    const positionComponent = new PositionComponent(pickupActor, new Point(x, y));
    pickupActor.components.push(positionComponent);
    const triggerComponent = new TriggerComponent(pickupActor);
    pickupActor.components.push(triggerComponent);

    const bodyDef = new ActorBodyDef();
    bodyDef.bodyType = BodyType.STATIC;
    bodyDef.makeSensor = true;
    bodyDef.fixtureType = FixtureType.FixtureType_Trigger;
    bodyDef.size.x = w;
    bodyDef.size.y = h;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    bodyDef.gravityScale = 0;
    bodyDef.collisionFlag = CollisionFlag.CollisionFlag_Pickup;
    bodyDef.collisionMask = CollisionFlag.CollisionFlag_Controller;
    const physicsComponent = new PhysicsComponent(pickupActor, false, 0, bodyDef, physics);
    pickupActor.components.push(physicsComponent);
    const soundPickupComponent = new SoundPickupComponent(pickupActor, triggerComponent, pickupSound);
    pickupActor.components.push(soundPickupComponent);
    return pickupActor;
}

export function createLootBoxActor(x: number, y: number, w: number, h: number,
                                   img: Animations, destroyAnim: Animations, physics: GamePhysics,
                                   destroySounds: Sounds[],
                                   loot: Map<PickupType, number>) {
    const resources = ResourceMgr.getInstance();
    const anim = resources.getAnimation(img);
    if (!anim) {
        console.error('Resources were not found');
        throw new Error('Resources were not found');
    }
    const box = new Actor();
    const positionComponent = new PositionComponent(box, new Point(x, y));
    box.components.push(positionComponent);
    const renderComponent = new ActorRenderComponent(box);
    box.components.push(renderComponent);
    const animationComponent = new AnimationComponent(box, renderComponent, anim);
    box.components.push(animationComponent);

    const healthComponent = new HealthComponent(box, 1, 1);
    box.components.push(healthComponent);
    const destroyableComponent = new DestroyableComponent(box, animationComponent, healthComponent, physics, destroySounds, destroyAnim);
    box.components.push(destroyableComponent);

    const bodyDef = new ActorBodyDef();
    bodyDef.bodyType = BodyType.DYNAMIC;
    bodyDef.makeSensor = false;
    bodyDef.fixtureType = FixtureType.FixtureType_Crate;
    bodyDef.size.x = w;
    bodyDef.size.y = h;
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    bodyDef.gravityScale = 1;
    bodyDef.collisionFlag = CollisionFlag.CollisionFlag_Crate;
    bodyDef.collisionMask = (CollisionFlag.CollisionFlag_ClawAttack | CollisionFlag.CollisionFlag_Ground |
        CollisionFlag.CollisionFlag_Solid | CollisionFlag.CollisionFlag_Crate);
    bodyDef.density = 0;
    bodyDef.friction = 0;
    bodyDef.restitution = 0;
    const physicsComponent = new PhysicsComponent(box, false, 0, bodyDef, physics);
    box.components.push(physicsComponent);
    const lootComponent = new LootComponent(box, loot, healthComponent, positionComponent, physics);
    box.components.push(lootComponent);

    return box;
}

export function createLevelObjectActor(x: number, y: number, img: Animations) {
    const resources = ResourceMgr.getInstance();
    const anim = resources.getAnimation(img);
    if (!anim) {
        console.error('Resources were not found');
        throw new Error('Resources were not found');
    }
    const actor = new Actor();
    const positionComponent = new PositionComponent(actor, new Point(x, y));
    actor.components.push(positionComponent);
    const renderComponent = new ActorRenderComponent(actor);
    actor.components.push(renderComponent);
    if (anim.frames.length > 1) {
        const animationComponent = new AnimationComponent(actor, renderComponent, anim);
        actor.components.push(animationComponent);
    } else if (anim.frames.length === 1) {
        renderComponent.image = anim.frames[0].image;
    } else {
        const m = `${anim.name} animation does not have frames`;
        console.error(m);
        throw new Error(m);
    }
    return actor;
}

export function createHUDElementActor(x: number, y: number, isRight: boolean, isBottom: boolean, img: Animations) {
    const resources = ResourceMgr.getInstance();
    const anim = resources.getAnimation(img);
    if (!anim) {
        console.error('Resources were not found');
        throw new Error('Resources were not found');
    }
    const actor = new Actor();
    const positionComponent = new PositionComponent(actor, new Point(x, y));
    actor.components.push(positionComponent);
    const renderComponent = new HUDRenderComponent(actor, isRight, isBottom);
    actor.components.push(renderComponent);
    if (anim.frames.length > 1) {
        const animationComponent = new AnimationComponent(actor, renderComponent, anim);
        actor.components.push(animationComponent);
    } else if (anim.frames.length === 1) {
        renderComponent.image = anim.frames[0].image;
    } else {
        const m = `${anim.name} animation does not have frames`;
        console.error(m);
        throw new Error(m);
    }
    return actor;
}

export function toHUDSceneNode(a: Actor) {
    const renderComponent = a.getComponent(HUDRenderComponent.NAME1) as HUDRenderComponent;
    const positionComponent = a.getComponent(PositionComponent.NAME) as PositionComponent;
    if (!renderComponent || !positionComponent) {
        const m = 'HUD actor does not have required components';
        console.error(m);
        throw new Error(m);
    }
    return new HUDSceneNode(a, positionComponent.position.x, positionComponent.position.y, renderComponent);
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

export function createSpriteDefinitionsFromGridTiles(tiles: GridTile, spriteNamePrefix: string): SpriteDefinition[] {
    const src = tiles.src;
    const srcWidth = tiles.srcWidth;
    const srcHeight = tiles.srcHeight;
    const w = tiles.w;
    const h = tiles.h;
    const x_start = tiles.x_start;
    const y_start = tiles.y_start;
    const x_count = tiles.x_count;
    const y_count = tiles.y_count;
    const x_space = tiles.space_x;
    const y_space = tiles.space_y;
    const spriteDef: SpriteDefinition[] = [];
    for (let x = 0; x < x_count; ++x) {
        for (let y = 0; y < y_count; ++y) {
            spriteDef.push(
                {
                    id: `${spriteNamePrefix}${x + y * x_count}`,
                    rect: new Rect(x * (w + x_space) + x_start, y * (h + y_space) + y_start, w, h),
                    srcWidth: srcWidth,
                    srcHeight: srcHeight,
                    src: src
                }
            );
        }
    }
    return spriteDef;
}

export function createAnimation(tiles: AnimationTiles): Animation {
    const animationName = tiles.name;
    const ox = tiles.ox !== undefined ? tiles.ox : 0;
    const oy = tiles.oy !== undefined ? tiles.oy : 0;
    const frames = tiles.map.map((t) => {
        const w = tiles.w !== undefined ? tiles.w : t.w !== undefined ? t.w : 0;
        const h = tiles.h !== undefined ? tiles.h : t.h !== undefined ? t.h : 0;
        const offsetX = t.cx !== undefined ? (w / 2 - (t.cx + ox)) : 0;
        const offsetY = t.cy !== undefined ? (h / 2 - (t.cy + oy)) : 0;
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

export function createCollisionObjectsAndScene(physics: GamePhysics, tiles: CollisionTiles, tileSetName: string,
                                               mapElement: (number | null)[][] | (number | null)[][][]): TilesSceneNode {
    let y_from = -1;
    let x_from = -1;
    let x_to = -1;
    let tileId = -1;
    const tilesMap: TileId[][][] = [];
    for (let y = 0; y < mapElement.length; ++y) {
        if (y_from !== -1) {
            // flush tiles
            createPhysicsObjectFromTiles(tileId, y_from, x_from, x_to, tiles, physics);
            y_from = -1;
        }
        if (mapElement[y]) {
            for (let x = 0; x < mapElement[y].length; ++x) {
                if (mapElement[y][x] !== null) {
                    if (Array.isArray(mapElement[y][x])) {
                        const arr = mapElement[y][x] as (number | null)[];
                        if (y_from !== -1) {
                            // flush tiles
                            createPhysicsObjectFromTiles(tileId, y_from, x_from, x_to, tiles, physics);
                            y_from = -1;
                        }
                        for (let n = 0; n < arr.length; ++n) {
                            const val = arr[n];
                            if (val !== null) {
                                setElement(val, y, x, tilesMap);
                                createPhysicsObjectFromTile(val, y, x, tiles, physics);
                            }
                        }
                    } else {
                        const val = mapElement[y][x] as number;
                        if (y_from === -1) {
                            // save to merge
                            y_from = y;
                            x_from = x;
                            x_to = x;
                            tileId = val;
                        } else if (tileId === val) {
                            // save to merge
                            x_to = x;
                        } else {
                            createPhysicsObjectFromTiles(tileId, y_from, x_from, x_to, tiles, physics);
                            x_from = x;
                            x_to = x;
                            tileId = val;
                        }
                        setElement(val, y, x, tilesMap);
                    }
                }
            }
        }
    }
    if (y_from !== -1) {
        // flush tiles
        createPhysicsObjectFromTiles(tileId, y_from, x_from, x_to, tiles, physics);
    }
    const tileRenderComponent = new TileRenderComponent(new Actor(), tiles.w || 0, tiles.h || 0, tilesMap);
    return new TilesSceneNode(tileRenderComponent, tileSetName);
}

export function createBgtilesAndScene(tiles: GridTile, zIndex: number, tileSetName: string): TilesSceneNode {
    const tilesMap: TileId[][][] = [];
    for (let y = 0; y < tiles.y_count; ++y) {
        for (let x = 0; x < tiles.x_count; ++x) {
            const val = x + y * tiles.x_count;
            setElement(val, y, x, tilesMap);
        }
    }
    const tileRenderComponent = new TileRenderComponent(new Actor(), tiles.w, tiles.h, tilesMap, zIndex, true);
    return new TilesSceneNode(tileRenderComponent, tileSetName);
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
    return createPhysicsObjectFromTiles(tileId, y, x, x, tiles, physics);
}

function createPhysicsObjectFromTiles(tileId: number, y: number, x_from: number, x_to: number, tiles: CollisionTiles, physics: GamePhysics) {
    const tile = tiles.map.find((t) => t.id === tileId);
    if (tile && tile.collisions && tile.collisions.length > 0) {
        const tileWidth = tiles.w || tile.w || 0;
        const tileHeight = tiles.h || tile.h || 0;
        tile.collisions.forEach((c) => {
            const worldX_from = x_from * tileWidth - tileWidth / 2 + c.x;
            const worldX_to = x_to * tileWidth - tileWidth / 2 + c.x + c.w;
            const worldY_from = y * tileHeight - tileHeight / 2 + c.y;
            const worldY_to = y * tileHeight - tileHeight / 2 + c.y + c.h;
            const w = worldX_to - worldX_from;
            const h = worldY_to - worldY_from;
            physics.addStaticBody(undefined, new Rect(worldX_from + w / 2, worldY_from + h / 2, w, h));
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
        collisionMask = CollisionFlag.CollisionFlag_DynamicActor | CollisionFlag.CollisionFlag_Crate;
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
