import {CollisionType} from "./enums/CollisionType";
import {Sounds} from "./enums/Sounds";
import {Animations} from "./enums/Animations";
import {PickupType} from "./enums/PickupType";

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
            loot: [
                {
                    type: PickupType.RING,
                    count: 5
                },
                {
                    type: PickupType.COIN,
                    count: 5
                }
            ]
        }
    ],
    crateInstances: [
        {
            spawnX: 13*64,
            spawnY: 7*64,
            loot: [
                {
                    type: PickupType.RING,
                    count: 5
                },
                {
                    type: PickupType.COIN,
                    count: 5
                }
            ]
        }
    ],
    officer: {
        speed: 1.3,
        anims: [
        {
            name: Animations.runOfficer,
            src: 'sprites/officer.png',
            srcWidth: 1196,
            srcHeight: 1169,
            map: [
                {
                    id: 0,
                    x: 4,
                    y: 11,
                    w: 92,
                    h: 112,
                    cx: 43,
                    cy: 57,
                    delay: 100
                },
                {
                    id: 1,
                    x: 106,
                    y: 10,
                    w: 90,
                    h: 113,
                    cx: 37,
                    cy: 61,
                    delay: 100
                },
                {
                    id: 2,
                    x: 214,
                    y: 7,
                    w: 80,
                    h: 117,
                    cx: 24,
                    cy: 62,
                    delay: 100
                },
                {
                    id: 3,
                    x: 314,
                    y: 12,
                    w: 78,
                    h: 111,
                    cx: 24,
                    cy: 57,
                    delay: 100
                },
                {
                    id: 4,
                    x: 415,
                    y: 4,
                    w: 82,
                    h: 119,
                    cx: 28,
                    cy: 58,
                    delay: 100
                },
                {
                    id: 5,
                    x: 513,
                    y: 3,
                    w: 78,
                    h: 120,
                    cx: 22,
                    cy: 61,
                    delay: 100
                },
                {
                    id: 6,
                    x: 609,
                    y: 0,
                    w: 84,
                    h: 123,
                    cx: 26,
                    cy: 65,
                    delay: 100
                },
                {
                    id: 7,
                    x: 706,
                    y: 7,
                    w: 90,
                    h: 116,
                    cx: 37,
                    cy: 61,
                    delay: 100
                },
            ]
        },
        {
            name: Animations.idleOfficer,
            src: 'sprites/officer.png',
            srcWidth: 1196,
            srcHeight: 1169,
            map: [
                {
                    id: 0,
                    x: 0,
                    y: 134,
                    w: 64,
                    h: 125,
                    cx: 31,
                    cy: 70,
                    delay: 2000
                },
                {
                    id: 1,
                    x: 68,
                    y: 134,
                    w: 61,
                    h: 125,
                    cx: 28,
                    cy: 70,
                    delay: 1000
                },
                {
                    id: 2,
                    x: 132,
                    y: 131,
                    w: 61,
                    h: 128,
                    cx: 28,
                    cy: 73,
                    delay: 3000
                },
                {
                    id: 3,
                    x: 198,
                    y: 136,
                    w: 61,
                    h: 123,
                    cx: 28,
                    cy: 68,
                    delay: 1000
                },
                {
                    id: 4,
                    x: 260,
                    y: 134,
                    w: 64,
                    h: 125,
                    cx: 31,
                    cy: 70,
                    delay: 2000
                },
                {
                    id: 5, // id: 3
                    x: 198,
                    y: 136,
                    w: 61,
                    h: 123,
                    cx: 28,
                    cy: 68,
                    delay: 1000
                },
                {
                    id: 6, // id: 2
                    x: 132,
                    y: 131,
                    w: 61,
                    h: 128,
                    cx: 28,
                    cy: 73,
                    delay: 3000
                },
            ]
        },
        {
            name: Animations.swordAttackOfficer,
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
        },
        {
            name: Animations.deathOfficer,
            src: 'sprites/officer.png',
            srcWidth: 1196,
            srcHeight: 1169,
            map: [
                {
                    id: 0,
                    x: 584,
                    y: 901,
                    cx: 51,
                    cy: 56,
                    w: 103,
                    h: 114,
                    delay: 1000000,
                },
            ]
        },
        {
            name: Animations.damageOfficer,
            src: 'sprites/officer.png',
            srcWidth: 1196,
            srcHeight: 1169,
            map: [
                {
                    id: 0,
                    x: 138,
                    y: 904,
                    cx: 37,
                    cy: 65,
                    w: 68,
                    h: 111,
                    delay: 70,
                },
                {
                    id: 1,
                    x: 141,
                    y: 1030,
                    cx: 42,
                    cy: 61,
                    w: 87,
                    h: 107,
                    delay: 200,
                },
                {
                    id: 2,
                    x: 138,
                    y: 904,
                    cx: 37,
                    cy: 65,
                    w: 68,
                    h: 111,
                    delay: 70,
                },
            ]
        }
        ]
    },
    player: {
        spawnX: 64 * 3,
        spawnY: 80,
        anims: [
        {
            name: Animations.idle,
            src: 'sprites/claw.png',
            srcWidth: 1141,
            srcHeight: 2707,
            map: [
                {
                    id: 0,
                    x: 2,
                    y: 115,
                    w: 66,
                    h: 116,
                    cx: 47,
                    cy: 53,
                    delay: 150
                },
                {
                    id: 1,
                    x: 73,
                    y: 117,
                    w: 66,
                    h: 115,
                    cx: 47,
                    cy: 52,
                    delay: 150
                },
                {
                    id: 2,
                    x: 155,
                    y: 119,
                    w: 66,
                    h: 113,
                    cx: 47,
                    cy: 50,
                    delay: 150
                },
                {
                    id: 3,
                    x: 235,
                    y: 117,
                    w: 67,
                    h: 115,
                    cx: 48,
                    cy: 52,
                    delay: 150
                },
                {
                    id: 4,
                    x: 312,
                    y: 117,
                    w: 69,
                    h: 115,
                    cx: 50,
                    cy: 52,
                    delay: 150
                },
                {
                    id: 5,
                    x: 392,
                    y: 115,
                    w: 72,
                    h: 116,
                    cx: 53,
                    cy: 53,
                    delay: 150
                },
                {
                    id: 6,
                    x: 473,
                    y: 115,
                    w: 74,
                    h: 116,
                    cx: 55,
                    cy: 53,
                    delay: 150
                },
                {
                    id: 7,
                    x: 553,
                    y: 116,
                    w: 71,
                    h: 115,
                    cx: 52,
                    cy: 52,
                    delay: 150
                },
            ]
        },
        {
            name: Animations.run,
            src: 'sprites/claw.png',
            srcWidth: 1141,
            srcHeight: 2707,
            map: [
                {
                    id: 0,
                    x: 5,
                    y: 3,
                    w: 83,
                    h: 106,
                    cx: 60,
                    cy: 46,
                    delay: 100
                },
                {
                    id: 1,
                    x: 116,
                    y: 10,
                    w: 93,
                    h: 99,
                    cx: 61,
                    cy: 39,
                    delay: 100
                },
                {
                    id: 2,
                    x: 226,
                    y: 7,
                    w: 91,
                    h: 102,
                    cx: 59,
                    cy: 52,
                    delay: 100
                },
                {
                    id: 3,
                    x: 332,
                    y: 13,
                    w: 104,
                    h: 97,
                    cx: 60,
                    cy: 51,
                    delay: 100
                },
                {
                    id: 4,
                    x: 447,
                    y: 1,
                    w: 96,
                    h: 108,
                    cx: 62,
                    cy: 47,
                    delay: 100
                },
                {
                    id: 5,
                    x: 559,
                    y: 5,
                    w: 83,
                    h: 104,
                    cx: 60,
                    cy: 44,
                    delay: 100
                },
                {
                    id: 6,
                    x: 668,
                    y: 13,
                    w: 89,
                    h: 98,
                    cx: 60,
                    cy: 40,
                    delay: 100
                },
                {
                    id: 7,
                    x: 779,
                    y: 10,
                    w: 91,
                    h: 99,
                    cx: 60,
                    cy: 53,
                    delay: 100
                },
                {
                    id: 8,
                    x: 882,
                    y: 8,
                    w: 105,
                    h: 101,
                    cx: 63,
                    cy: 51,
                    delay: 100
                },
                {
                    id: 9,
                    x: 998,
                    y: 0,
                    w: 95,
                    h: 109,
                    cx: 62,
                    cy: 46,
                    delay: 100
                },
            ]
        },
        {
            name: Animations.jump,
            src: 'sprites/claw.png',
            srcWidth: 1141,
            srcHeight: 2707,
            map: [
                {
                    id: 0,
                    x: 3,
                    y: 1395,
                    w: 91,
                    h: 102,
                    cx: 59,
                    cy: 52,
                    delay: 50
                },
                {
                    id: 1,
                    x: 108,
                    y: 1412,
                    w: 83,
                    h: 85,
                    cx: 59,
                    cy: 52,
                    delay: 50
                },
                {
                    id: 2,
                    x: 213,
                    y: 1419,
                    w: 72,
                    h: 78,
                    cx: 50,
                    cy: 49,
                    delay: 50
                },
                {
                    id: 3,
                    x: 310,
                    y: 1410,
                    w: 78,
                    h: 87,
                    cx: 49,
                    cy: 53,
                    delay: 50
                },
                {
                    id: 4,
                    x: 403,
                    y: 1408,
                    w: 94,
                    h: 89,
                    cx: 53,
                    cy: 53,
                    delay: 50
                },
                {
                    id: 5,
                    x: 505,
                    y: 1407,
                    w: 89,
                    h: 90,
                    cx: 50,
                    cy: 52,
                    delay: 50
                },
                {
                    id: 6,
                    x: 606,
                    y: 1406,
                    w: 87,
                    h: 91,
                    cx: 46,
                    cy: 52,
                    delay: 50000000
                },
            ]
        },
        {
            name: Animations.fall,
            src: 'sprites/claw.png',
            srcWidth: 1141,
            srcHeight: 2707,
            map: [
                {
                    id: 0,
                    x: 2,
                    y: 1505,
                    w: 87,
                    h: 103,
                    cx: 45,
                    cy: 52,
                    delay: 100
                },
                {
                    id: 1,
                    x: 95,
                    y: 1504,
                    w: 81,
                    h: 104,
                    cx: 44,
                    cy: 53,
                    delay: 100
                },
                {
                    id: 2,
                    x: 181,
                    y: 1504,
                    w: 87,
                    h: 104,
                    cx: 44,
                    cy: 54,
                    delay: 100
                },
                {
                    id: 3,
                    x: 275,
                    y: 1503,
                    w: 82,
                    h: 105,
                    cx: 43,
                    cy: 55,
                    delay: 100
                },
                {
                    id: 4,
                    x: 364,
                    y: 1503,
                    w: 82,
                    h: 105,
                    cx: 43,
                    cy: 54,
                    delay: 100
                },
            ]
        },
        {
            name: Animations.swordAttack,
            src: 'sprites/claw.png',
            ox: -24,
            srcWidth: 1141,
            srcHeight: 2707,
            map: [
                {
                    id: 0,
                    x: 36,
                    y: 242,
                    w: 65,
                    h: 110,
                    cx: 68,
                    cy: 47,
                    delay: 70
                },
                {
                    id: 1,
                    x: 189,
                    y: 243,
                    w: 72,
                    h: 104,
                    cx: 69,
                    cy: 41,
                    delay: 70
                },
                {
                    id: 2,
                    x: 346,
                    y: 258,
                    w: 100,
                    h: 93,
                    cx: 69,
                    cy: 30,
                    delay: 70
                },
                {
                    id: 3,
                    x: 470,
                    y: 266,
                    w: 160,
                    h: 85,
                    cx: 70,
                    cy: 22,
                    delay: 70
                },
                {
                    id: 4, // id: 2
                    x: 346,
                    y: 258,
                    w: 100,
                    h: 93,
                    cx: 69,
                    cy: 30,
                    delay: 70
                },
                {
                    id: 5, // id: 1
                    x: 189,
                    y: 243,
                    w: 72,
                    h: 104,
                    cx: 69,
                    cy: 41,
                    delay: 70
                },
                {
                    id: 6, // id: 0
                    x: 36,
                    y: 242,
                    w: 65,
                    h: 110,
                    cx: 68,
                    cy: 47,
                    delay: 70
                },
            ]
        },
        {
            name: Animations.swordAttackJump,
            src: 'sprites/claw.png',
            srcWidth: 1141,
            srcHeight: 2707,
            map: [
                {
                    id: 0,
                    x: 29,
                    y: 1614,
                    w: 76,
                    h: 107,
                    cx: 51,
                    cy: 43,
                    delay: 70
                },
                {
                    id: 1,
                    x: 176,
                    y: 1616,
                    w: 90,
                    h: 105,
                    cx: 54,
                    cy: 43,
                    delay: 70
                },
                {
                    id: 2,
                    x: 301,
                    y: 1618,
                    w: 148,
                    h: 103,
                    cx: 53,
                    cy: 42,
                    delay: 70
                },
                {
                    id: 3, // id: 1
                    x: 176,
                    y: 1616,
                    w: 90,
                    h: 105,
                    cx: 54,
                    cy: 43,
                    delay: 70
                },
                {
                    id: 4, // id: 0
                    x: 29,
                    y: 1614,
                    w: 76,
                    h: 107,
                    cx: 51,
                    cy: 43,
                    delay: 70
                },
            ]
        },
        {
            name: Animations.damage1,
            src: 'sprites/claw.png',
            srcWidth: 1141,
            srcHeight: 2707,
            map: [
                {
                    id: 0,
                    x: 8,
                    y: 2602,
                    cx: 56,
                    cy: 43,
                    w: 76,
                    h: 102,
                    delay: 500,
                },
                {
                    id: 0,
                    x: 8,
                    y: 2602,
                    cx: 56,
                    cy: 43,
                    w: 76,
                    h: 102,
                    delay: 1,
                },
            ]
        },
        {
            name: Animations.damage2,
            src: 'sprites/claw.png',
            srcWidth: 1141,
            srcHeight: 2707,
            map: [
                {
                    id: 0,
                    x: 5,
                    y: 2504,
                    cx: 54,
                    cy: 28,
                    w: 83,
                    h: 86,
                    delay: 500,
                },
                {
                    id: 0,
                    x: 5,
                    y: 2504,
                    cx: 54,
                    cy: 28,
                    w: 83,
                    h: 86,
                    delay: 1,
                },
            ]
        }
        ]
    },
    treasureDef: [
        {
            type: PickupType.RING,
            pickupSound: Sounds.treasure_ring,
            score: 1000,
            w: 22,
            h: 24,
            anims: [
                {
                    name: Animations.treasureRingRed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 1,
                            y: 252,
                            cx: 11,
                            cy: 12,
                            w: 22,
                            h: 24,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureRingBlue,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 25,
                            y: 252,
                            cx: 11,
                            cy: 12,
                            w: 22,
                            h: 24,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureRingGreed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 49,
                            y: 252,
                            cx: 11,
                            cy: 12,
                            w: 22,
                            h: 24,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureRingPink,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 73,
                            y: 252,
                            cx: 11,
                            cy: 12,
                            w: 22,
                            h: 24,
                            delay: 500000,
                        },
                    ]
                }
            ]
        },
        {
            type: PickupType.COIN,
            pickupSound: Sounds.treasure_coin,
            w: 28,
            h: 29,
            score: 100,
            anims: [
                {
                    name: Animations.treasureCoin,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 1 + 30 * 0,
                            y: 35,
                            cx: 14,
                            cy: 14,
                            w: 28,
                            h: 29,
                            delay: 100,
                        },
                        {
                            id: 1,
                            x: 1 + 30 * 1,
                            y: 35,
                            cx: 14,
                            cy: 14,
                            w: 28,
                            h: 29,
                            delay: 100,
                        },
                        {
                            id: 2,
                            x: 1 + 30 * 2,
                            y: 35,
                            cx: 14,
                            cy: 14,
                            w: 28,
                            h: 29,
                            delay: 100,
                        },
                        {
                            id: 3,
                            x: 1 + 30 * 3,
                            y: 35,
                            cx: 14,
                            cy: 14,
                            w: 28,
                            h: 29,
                            delay: 100,
                        },
                        {
                            id: 4,
                            x: 1 + 30 * 4,
                            y: 35,
                            cx: 14,
                            cy: 14,
                            w: 28,
                            h: 29,
                            delay: 100,
                        },
                        {
                            id: 5,
                            x: 1 + 30 * 5,
                            y: 35,
                            cx: 14,
                            cy: 14,
                            w: 28,
                            h: 29,
                            delay: 100,
                        },
                        {
                            id: 6,
                            x: 1 + 30 * 6,
                            y: 35,
                            cx: 14,
                            cy: 14,
                            w: 28,
                            h: 29,
                            delay: 100,
                        },
                        {
                            id: 7,
                            x: 1 + 30 * 7,
                            y: 35,
                            cx: 14,
                            cy: 14,
                            w: 28,
                            h: 29,
                            delay: 100,
                        },
                        {
                            id: 8,
                            x: 1 + 30 * 8,
                            y: 35,
                            cx: 14,
                            cy: 14,
                            w: 28,
                            h: 29,
                            delay: 100,
                        },
                    ]
                }
            ]
        }
    ],
    levelItems: [
        {
            name: Animations.candle,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            map: [
                {
                    id: 0,
                    x: 1,
                    y: 731,
                    cx: 25,
                    cy: 62,
                    w: 51,
                    h: 124,
                    delay: 300,
                },
                {
                    id: 1,
                    x: 57,
                    y: 733,
                    cx: 25,
                    cy: 62,
                    w: 51,
                    h: 124,
                    delay: 300,
                },
                {
                    id: 2,
                    x: 113,
                    y: 733,
                    cx: 25,
                    cy: 62,
                    w: 51,
                    h: 124,
                    delay: 300,
                },
                {
                    id: 3,
                    x: 165,
                    y: 731,
                    cx: 25,
                    cy: 62,
                    w: 51,
                    h: 124,
                    delay: 300,
                },
            ]
        },
        {
            name: Animations.crate,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            map: [
                {
                    id: 0,
                    x: 1,
                    y: 224,
                    w: 56,
                    h: 54,
                    cx: 56 / 2,
                    cy: 54 / 2,
                    delay: 3000000000,
                },
            ]
        },
        {
            name: Animations.crate_destroying,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            map: [
                {
                    id: 0,
                    x: 1,
                    y: 224,
                    w: 56,
                    h: 54,
                    cx: 56 / 2,
                    cy: 54 / 2,
                    delay: 70,
                },
                {
                    id: 1,
                    x: 61,
                    y: 224,
                    w: 56,
                    h: 54,
                    cx: 56 / 2,
                    cy: 54 / 2,
                    delay: 70,
                },
                {
                    id: 2,
                    x: 121,
                    y: 224,
                    w: 60,
                    h: 61,
                    cx: 56 / 2 + 4,
                    cy: 54 / 2 + 6,
                    delay: 70,
                },
                {
                    id: 3,
                    x: 186,
                    y: 224,
                    w: 74,
                    h: 70,
                    cx: 56 / 2 + 4,
                    cy: 54 / 2 + 10,
                    delay: 70,
                },
                {
                    id: 4,
                    x: 264,
                    y: 224,
                    w: 116,
                    h: 74,
                    cx: 116 / 2,
                    cy: 74 / 2,
                    delay: 70,
                },
                {
                    id: 5,
                    x: 384,
                    y: 224,
                    w: 132,
                    h: 58,
                    cx: 132 / 2,
                    cy: 58 / 2,
                    delay: 70,
                },
                {
                    id: 6,
                    x: 521,
                    y: 224,
                    w: 132,
                    h: 58,
                    cx: 132 / 2,
                    cy: 58 / 2,
                    delay: 70,
                },
                {
                    id: 7,
                    x: 656,
                    y: 224,
                    w: 131,
                    h: 55,
                    cx: 132 / 2,
                    cy: 56 / 2,
                    delay: 70,
                },
            ]
        }
    ],
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
        {
            name: Sounds.officer_idle1,
            src: 'sounds/officer_idle1.mp3'
        },
        {
            name: Sounds.officer_idle2,
            src: 'sounds/officer_idle2.mp3'
        },
        {
            name: Sounds.splash,
            src: 'sounds/splash.mp3'
        },
        {
            name: Sounds.officer_killed1,
            src: 'sounds/officer_killed1.mp3'
        },
        {
            name: Sounds.officer_killed2,
            src: 'sounds/officer_killed2.mp3'
        },
        {
            name: Sounds.officer_damage1,
            src: 'sounds/officer_damage1.mp3'
        },
        {
            name: Sounds.officer_damage2,
            src: 'sounds/officer_damage2.mp3'
        },
        {
            name: Sounds.claw_damage1,
            src: 'sounds/claw_damage1.mp3'
        },
        {
            name: Sounds.claw_damage2,
            src: 'sounds/claw_damage2.mp3'
        },
        {
            name: Sounds.claw_damage3,
            src: 'sounds/claw_damage3.mp3'
        },
        {
            name: Sounds.claw_damage4,
            src: 'sounds/claw_damage4.mp3'
        },
        {
            name: Sounds.claw_killEnemy,
            src: 'sounds/claw_killEnemy.mp3'
        },
        {
            name: Sounds.treasure_ring,
            src: 'sounds/rings.mp3'
        },
        {
            name: Sounds.treasure_coin,
            src: 'sounds/coin.mp3'
        },
        {
            name: Sounds.crate_break1,
            src: 'sounds/cratebreak1.mp3'
        },
        {
            name: Sounds.crate_break2,
            src: 'sounds/cratebreak2.mp3'
        },
    ]
};

export interface Tiles {
    src: string;
    srcWidth: number;
    srcHeight: number;
    ox?: number;
    oy?: number;
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
    name: Animations;
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

export interface TreasureDef {
    type: PickupType;
    score: number;
    w: number;
    h: number;
    anims: AnimationTiles[];
    pickupSound: Sounds;
}

export interface LootInfo {
    type: PickupType;
    count: number;
}
