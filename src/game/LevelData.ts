import {CollisionType} from "./enums/CollisionType";
import {Sounds} from "./enums/Sounds";

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
        [6   , 6   , 7   , 7   , 7   , 7   , 7   , 7   , 7   , 7   , 7   , 7   , 7   , 7   , 7   , 7   , 7   , 6   , 6],
        [6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6],
        [6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6],
        [6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6],
        [6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6],
        [6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6],
        [6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6],
        [6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6],
        [6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6],
        [6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6],
        [6   , 10  , 2   , 2   , 3   , 4   , null, null, null, null, null, null, 1   , 2   , 2   , 2   , 2   , 9   , 6],
        [6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6],
        [6   , 6   , 6   , 6   , 6   , 10  , 2   , 2   , 2   , 2   , 2   , 2   , 9   , 6   , 6   , 6   , 6   , 6   , 6],
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6],
    ],
    officerInstances: [
        {
            spawnX: 9*64,
            spawnY: 2*64,
            borderLeft: 6*64 + 20,
            borderRight: 11*64 - 20,
        }
    ],
    officer: {
        speed: 1.3,
        runAnim: {
            src: 'sprites/officer_run.png',
            w: 101,
            h: 126,
            srcWidth: 808,
            srcHeight: 126,
            map: [
                {
                    id: 0,
                    x: 101 * 0,
                    y: 0,
                    delay: 100
                },
                {
                    id: 1,
                    x: 101 * 1,
                    y: 0,
                    delay: 100
                },
                {
                    id: 2,
                    x: 101 * 2,
                    y: 0,
                    delay: 100
                },
                {
                    id: 3,
                    x: 101 * 3,
                    y: 0,
                    delay: 100
                },
                {
                    id: 4,
                    x: 101 * 4,
                    y: 0,
                    delay: 100
                },
                {
                    id: 5,
                    x: 101 * 5,
                    y: 0,
                    delay: 100
                },
                {
                    id: 6,
                    x: 101 * 6,
                    y: 0,
                    delay: 100
                },
                {
                    id: 7,
                    x: 101 * 7,
                    y: 0,
                    delay: 100
                },
            ]
        },
        idleAnim: {
            src: 'sprites/officer_idle.png',
            w: 64,
            h: 128,
            srcWidth: 320,
            srcHeight: 128,
            map: [
                {
                    id: 0,
                    x: 64 * 0,
                    y: 0,
                    delay: 2000
                },
                {
                    id: 1,
                    x: 64 * 1,
                    y: 0,
                    delay: 1000
                },
                {
                    id: 2,
                    x: 64 * 2,
                    y: 0,
                    delay: 3000
                },
                {
                    id: 3,
                    x: 64 * 3,
                    y: 0,
                    delay: 1000
                },
                {
                    id: 4,
                    x: 64 * 4,
                    y: 0,
                    delay: 2000
                },
                {
                    id: 5,
                    x: 64 * 3,
                    y: 0,
                    delay: 1000
                },
                {
                    id: 6,
                    x: 64 * 2,
                    y: 0,
                    delay: 3000
                },
            ]
        },
        swordAttackAnim: {
            src: 'sprites/officer.png',
            srcWidth: 320,
            srcHeight: 128,
            map: [
                {
                    id: 0,
                    x: 46,
                    y: 267,
                    cx: 35,
                    cy: 65,
                    w: 79,
                    h: 123,
                    delay: 500,
                },
                {
                    id: 1,
                    x: 210,
                    y: 268,
                    cx: 36,
                    cy: 64,
                    w: 82,
                    h: 122,
                    delay: 80,
                },
                {
                    id: 2,
                    x: 369,
                    y: 275,
                    cx: 53,
                    cy: 60,
                    w: 90,
                    h: 115,
                    delay: 80,
                },
                {
                    id: 3,
                    x: 521,
                    y: 282,
                    cx: 84,
                    cy: 52,
                    w: 112,
                    h: 108,
                    delay: 80,
                },
                {
                    id: 4,
                    x: 661,
                    y: 287,
                    cx: 135,
                    cy: 48,
                    w: 163,
                    h: 103,
                    delay: 80,
                },
                {
                    id: 5,
                    x: 521,
                    y: 282,
                    cx: 84,
                    cy: 52,
                    w: 112,
                    h: 108,
                    delay: 80,
                },
                {
                    id: 6,
                    x: 369,
                    y: 275,
                    cx: 53,
                    cy: 60,
                    w: 90,
                    h: 115,
                    delay: 80,
                },
                {
                    id: 7,
                    x: 210,
                    y: 268,
                    cx: 36,
                    cy: 64,
                    w: 82,
                    h: 122,
                    delay: 80,
                },
                {
                    id: 8,
                    x: 46,
                    y: 267,
                    cx: 35,
                    cy: 65,
                    w: 79,
                    h: 123,
                    delay: 80,
                },
            ]
        }
    },
    player: {
        spawnX: 64 * 3,
        spawnY: 80,
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
                    delay: 150
                },
                {
                    id: 1,
                    x: 74 * 1,
                    y: 0,
                    delay: 150
                },
                {
                    id: 2,
                    x: 74 * 2,
                    y: 0,
                    delay: 150
                },
                {
                    id: 3,
                    x: 74 * 3,
                    y: 0,
                    delay: 150
                },
                {
                    id: 4,
                    x: 74 * 4,
                    y: 0,
                    delay: 150
                },
                {
                    id: 5,
                    x: 74 * 5,
                    y: 0,
                    delay: 150
                },
                {
                    id: 6,
                    x: 74 * 6,
                    y: 0,
                    delay: 150
                },
                {
                    id: 7,
                    x: 74 * 7,
                    y: 0,
                    delay: 150
                },
            ]
        },
        runAnim: {
            src: 'sprites/claw_run.png',
            w: 107,
            h: 109,
            srcWidth: 1070,
            srcHeight: 109,
            map: [
                {
                    id: 0,
                    x: 107 * 0,
                    y: 0,
                    delay: 100
                },
                {
                    id: 1,
                    x: 107 * 1,
                    y: 0,
                    delay: 100
                },
                {
                    id: 2,
                    x: 107 * 2,
                    y: 0,
                    delay: 100
                },
                {
                    id: 3,
                    x: 107 * 3,
                    y: 0,
                    delay: 100
                },
                {
                    id: 4,
                    x: 107 * 4,
                    y: 0,
                    delay: 100
                },
                {
                    id: 5,
                    x: 107 * 5,
                    y: 0,
                    delay: 100
                },
                {
                    id: 6,
                    x: 107 * 6,
                    y: 0,
                    delay: 100
                },
                {
                    id: 7,
                    x: 107 * 7,
                    y: 0,
                    delay: 100
                },
                {
                    id: 8,
                    x: 107 * 8,
                    y: 0,
                    delay: 100
                },
                {
                    id: 9,
                    x: 107 * 9,
                    y: 0,
                    delay: 100
                },
            ]
        },
        jumpAnim: {
            src: 'sprites/claw_jump.png',
            w: 94,
            h: 104,
            srcWidth: 658,
            srcHeight: 104,
            map: [
                {
                    id: 0,
                    x: 94 * 0,
                    y: 0,
                    delay: 50
                },
                {
                    id: 1,
                    x: 94 * 1,
                    y: 0,
                    delay: 50
                },
                {
                    id: 2,
                    x: 94 * 2,
                    y: 0,
                    delay: 50
                },
                {
                    id: 3,
                    x: 94 * 3,
                    y: 0,
                    delay: 50
                },
                {
                    id: 4,
                    x: 94 * 4,
                    y: 0,
                    delay: 50
                },
                {
                    id: 5,
                    x: 94 * 5,
                    y: 0,
                    delay: 50
                },
                {
                    id: 6,
                    x: 94 * 6,
                    y: 0,
                    delay: 50000000
                },
            ]
        },
        fallAnim: {
            src: 'sprites/claw_fall.png',
            w: 87,
            h: 106,
            srcWidth: 435,
            srcHeight: 106,
            map: [
                {
                    id: 0,
                    x: 87 * 0,
                    y: 0,
                    delay: 100
                },
                {
                    id: 1,
                    x: 87 * 1,
                    y: 0,
                    delay: 100
                },
                {
                    id: 2,
                    x: 87 * 2,
                    y: 0,
                    delay: 100
                },
                {
                    id: 3,
                    x: 87 * 3,
                    y: 0,
                    delay: 100
                },
            ]
        },
        swordAttackAnim: {
            src: 'sprites/claw_swordAttack.png',
            w: 161,
            h: 110,
            srcWidth: 644,
            srcHeight: 110,
            map: [
                {
                    id: 0,
                    x: 161 * 0,
                    y: 0,
                    delay: 70
                },
                {
                    id: 1,
                    x: 161 * 1,
                    y: 0,
                    delay: 70
                },
                {
                    id: 2,
                    x: 161 * 2,
                    y: 0,
                    delay: 70
                },
                {
                    id: 3,
                    x: 161 * 3,
                    y: 0,
                    delay: 70
                },
                {
                    id: 4,
                    x: 161 * 2,
                    y: 0,
                    delay: 70
                },
                {
                    id: 5,
                    x: 161 * 1,
                    y: 0,
                    delay: 70
                },
                {
                    id: 6,
                    x: 161 * 0,
                    y: 0,
                    delay: 70
                },
            ]
        },
        swordAttackJumpAnim: {
            src: 'sprites/claw_swordAttackJump.png',
            w: 149,
            h: 107,
            srcWidth: 644,
            srcHeight: 107,
            map: [
                {
                    id: 0,
                    x: 149 * 0,
                    y: 0,
                    delay: 70
                },
                {
                    id: 1,
                    x: 149 * 1,
                    y: 0,
                    delay: 70
                },
                {
                    id: 2,
                    x: 149 * 2,
                    y: 0,
                    delay: 70
                },
                {
                    id: 3,
                    x: 149 * 1,
                    y: 0,
                    delay: 70
                },
                {
                    id: 4,
                    x: 149 * 0,
                    y: 0,
                    delay: 70
                },
            ]
        }
    },
    sounds: [
        {
            name: Sounds.claw_swordAttack,
            src: 'sounds/claw_swordAttack.mp3'
        },
        {
            name: Sounds.officer_swordAttack,
            src: 'sounds/officer_swordAttack.mp3'
        },
        {
            name: Sounds.officer_agro1,
            src: 'sounds/officer_agro1.mp3'
        },
        {
            name: Sounds.officer_agro2,
            src: 'sounds/officer_agro2.mp3'
        },
    ]
};

export interface Tiles {
    src: string;
    srcWidth: number;
    srcHeight: number;
    w?: number;
    h?: number;
    map: Tile[];
}

export interface Tile {
    id: number;
    x: number;
    y: number;
    cx?: number;
    cy?: number;
    w?: number;
    h?: number;
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

export interface SoundInfo {
    name: string;
    src: string;
}
