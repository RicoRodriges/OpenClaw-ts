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

export function createClawActor(physics: GamePhysics, spawnX: number, spawnY: number, anim: Animation): Actor {
    const claw = new Actor();
    const positionComponent = new PositionComponent(claw, new Point(spawnX, spawnY));
    claw.components.push(positionComponent);
    const controllableComponent = new ClawControllableComponent(claw);
    claw.components.push(controllableComponent);
    const physicsComponent = new PhysicsComponent(claw, true, false, true, gameProperties.player.maxJumpHeight, gameProperties.player.stayW, gameProperties.player.stayH, 4.0, 0.0, 0.5, physics, controllableComponent);
    claw.components.push(physicsComponent);
    const animationComponent = new AnimationComponent(claw, anim);
    claw.components.push(animationComponent);
    const renderComponent = new ActorRenderComponent(claw);
    claw.components.push(renderComponent);

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

export function createSpriteDefinitions(tiles: Tiles, spriteNamePrefix: string): SpriteDefinition[] {
    const w = tiles.w;
    const h = tiles.h;
    const src = tiles.src;
    const srcWidth = tiles.srcWidth;
    const srcHeight = tiles.srcHeight;
    return tiles.map.map((t) => {
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
    const w = tiles.w;
    const h = tiles.h;
    const frames = tiles.map.map((t) =>
        new Frame(new Image(0, 0, w, h, `${animationName}${t.id}`), t.delay)
    );
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
    const tileRenderComponent = new TileRenderComponent(new Actor(), tiles.w, tiles.h, tilesMap);
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
    const tileWidth = tiles.w;
    const tileHeight = tiles.h;
    const tile = tiles.map.find((t) => t.id === tileId);
    if (tile && tile.collisions && tile.collisions.length > 0) {
        tile.collisions.forEach((c) => {
            const worldX = x * tileWidth + c.x;
            const worldY = y * tileHeight + c.y;
            physics.addStaticBody(undefined, new Rect(worldX, worldY, c.w, c.h));
        });
    }
}
