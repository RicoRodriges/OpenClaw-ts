import {CollisionType} from "./enums/CollisionType";

export class CollisionInfo {
    constructor(public x: number, public y: number, public w: number, public h: number,
                public type: CollisionType) {
    }
}

export default {
    tiles: {
        src: 'sprites/Level 1.png',
        srcWidth: 715,
        srcHeight: 974,
        w: 64,
        h: 64,
        map: [

            //floor
            {
                id: 1,
                x: 65 * 1,
                y: 65 * 0,
                collisions: [
                    new CollisionInfo(32, 56, 32, 64 - 56, CollisionType.CollisionType_Solid)
                ]
            },
            {
                id: 2,
                x: 65 * 2,
                y: 65 * 0,
                collisions: [
                    new CollisionInfo(0, 56, 64, 64 - 56, CollisionType.CollisionType_Solid)
                ]
            },
            {
                id: 3,
                x: 65 * 3,
                y: 65 * 0,
                collisions: [
                    new CollisionInfo(0, 56, 64, 64 - 56, CollisionType.CollisionType_Solid)
                ]
            },
            {
                id: 4,
                x: 65 * 4,
                y: 65 * 0,
                collisions: [
                    new CollisionInfo(0, 56, 30, 64 - 56, CollisionType.CollisionType_Solid)
                ]
            },
            {
                id: 5,
                x: 65 * 1,
                y: 65 * 1,
                collisions: [
                    new CollisionInfo(32, 0, 32, 64, CollisionType.CollisionType_Solid)
                ]
            },
            {
                id: 6,
                x: 65 * 2,
                y: 65 * 1,
                collisions: [
                    new CollisionInfo(0, 0, 64, 64, CollisionType.CollisionType_Solid)
                ]
            },
            {
                id: 7,
                x: 65 * 3,
                y: 65 * 1,
                collisions: [
                    new CollisionInfo(0, 0, 64, 64, CollisionType.CollisionType_Solid)
                ]
            },
            {
                id: 8,
                x: 65 * 4,
                y: 65 * 1,
                collisions: [
                    new CollisionInfo(0, 0, 30, 64, CollisionType.CollisionType_Solid)
                ]
            },
            {
                id: 9,
                x: 65 * 1,
                y: 65 * 2,
                collisions: [
                    new CollisionInfo(0, 56, 32, 64 - 56, CollisionType.CollisionType_Solid),
                    new CollisionInfo(32, 0, 32, 64, CollisionType.CollisionType_Solid)
                ]
            },
            {
                id: 10,
                x: 65 * 4,
                y: 65 * 2,
                collisions: [
                    new CollisionInfo(30, 56, 64 - 30, 64 - 56, CollisionType.CollisionType_Solid),
                    new CollisionInfo(0, 0, 30, 64, CollisionType.CollisionType_Solid)
                ]
            },
        ]
    },
    map: [
        [7, 7, 7, 7, 7, 7, 7, 7, 7],
        [],
        [4, null, null, null, null, null, null, null, 1],
        [8, null, null, null, null, null, null, null, 5],
        [8, null, null, null, null, null, null, null, 5],
        [8, null, null, null, null, null, null, null, 5],
        [10, 3, 4, null, null, 1, 2, 2, 9],
        [6, 6, 8, null, null, 5, 6, 6, 6],
        [6, 6, 10, 2, 2, 9, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6],
    ],
    player: {
        spawnX: 64 * 3,
        spawnY: 80,
        maxJumpHeight: 20,
        idleAnim: {
            src: 'sprites/claw_idle.png',
            w: 74,
            h: 116,
            srcWidth: 592,
            srcHeight: 116,
            map: [
                {
                    id: 0,
                    x: 74 * 0,
                    y: 0,
                    delay: 100
                },
                {
                    id: 1,
                    x: 74 * 1,
                    y: 0,
                    delay: 100
                },
                {
                    id: 2,
                    x: 74 * 2,
                    y: 0,
                    delay: 100
                },
                {
                    id: 3,
                    x: 74 * 3,
                    y: 0,
                    delay: 100
                },
                {
                    id: 4,
                    x: 74 * 4,
                    y: 0,
                    delay: 100
                },
                {
                    id: 5,
                    x: 74 * 5,
                    y: 0,
                    delay: 100
                },
                {
                    id: 6,
                    x: 74 * 6,
                    y: 0,
                    delay: 100
                },
                {
                    id: 7,
                    x: 74 * 7,
                    y: 0,
                    delay: 100
                },
            ]
        }
    },
};

export interface Tiles {
    src: string;
    srcWidth: number;
    srcHeight: number;
    w: number;
    h: number;
    map: Tile[];
}

export interface Tile {
    id: number;
    x: number;
    y: number;
}

export interface AnimationTiles extends Tiles {
    map: AnimationTile[];
}

export interface AnimationTile extends Tile {
    delay: number;
}

export interface CollisionTiles extends Tiles {
    map: CollisionTile[];
}

export interface CollisionTile extends Tile {
    collisions: CollisionInfo[];
}
