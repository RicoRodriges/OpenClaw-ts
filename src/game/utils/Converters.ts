import Actor from "../actors/Actor";
import PositionComponent from "../actors/components/PositionComponent";
import Point from "./Point";
import PhysicsComponent from "../actors/components/PhysicsComponent";
import GamePhysics from "../GamePhysics";
import {ActorRenderComponent, TileId, TileRenderComponent} from "../actors/components/RenderComponent";
import AnimationComponent from "../actors/components/AnimationComponent";
import Animation from "../graphics/Animation";
import Frame from "../graphics/Frame";
import {AnimationTiles, CollisionTiles, Tiles} from "../LevelData";
import {SpriteDefinition} from "../../components/SvgSpriteDefinitionComponent";
import Rect from "./Rect";
import Image from "../graphics/Image";
import TilesSceneNode from "../scene/TilesSceneNode";
import gameProperties from "../GameProperties";
import ClawControllableComponent from "../actors/components/ClawControllableComponent";
import PatrolEnemyAIStateComponent from "../actors/components/enemy/PatrolEnemyAIStateComponent";

export function createClawActor(physics: GamePhysics, spawnX: number, spawnY: number, anim: Animation): Actor {
    const claw = new Actor();
    const positionComponent = new PositionComponent(claw, new Point(spawnX, spawnY));
    claw.components.push(positionComponent);
    const animationComponent = new AnimationComponent(claw, anim);
    claw.components.push(animationComponent);
    const renderComponent = new ActorRenderComponent(claw);
    claw.components.push(renderComponent);
    const controllableComponent = new ClawControllableComponent(claw, animationComponent, renderComponent);
    animationComponent.animationObservers.push(controllableComponent);
    claw.components.push(controllableComponent);
    const physicsComponent = new PhysicsComponent(claw, true, false, true, gameProperties.player.maxJumpHeight, gameProperties.player.stayW, gameProperties.player.stayH, 4.0, 0.0, 0.5, physics, controllableComponent, true, false);
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
                                   speed: number, leftBorder: number, rightBorder: number) {
    const officer = new Actor();
    const positionComponent = new PositionComponent(officer, new Point(spawnX, spawnY));
    officer.components.push(positionComponent);
    const animationComponent = new AnimationComponent(officer, run);
    officer.components.push(animationComponent);
    const renderComponent = new ActorRenderComponent(officer);
    officer.components.push(renderComponent);
    const physicsComponent = new PhysicsComponent(officer, false, false, false, 0, gameProperties.player.stayW, gameProperties.player.stayH, 0, 0.0, 0.5, physics, null, false);
    officer.components.push(physicsComponent);
    const patrolComponent = new PatrolEnemyAIStateComponent(officer, physics, positionComponent, animationComponent, renderComponent, speed, leftBorder, rightBorder, idle, run);
    animationComponent.animationObservers.push(patrolComponent);
    officer.components.push(patrolComponent);
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
