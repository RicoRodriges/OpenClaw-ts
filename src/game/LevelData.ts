import {CollisionType} from "./enums/CollisionType";
import {Sounds} from "./enums/Sounds";
import {Animations} from "./enums/Animations";
import {PickupType} from "./enums/PickupType";
import Rect from "./utils/Rect";

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

            // start floor left
            {
                id: 1,
                x: 65 * 1,
                y: 65 * 0,
                collisions: []
            },
            // floor
            {
                id: 2,
                x: 65 * 2,
                y: 65 * 0,
                collisions: []
            },
            // stopping floor right
            {
                id: 3,
                x: 65 * 3,
                y: 65 * 0,
                collisions: []
            },
            // stop floor right
            {
                id: 4,
                x: 65 * 4,
                y: 65 * 0,
                collisions: []
            },
            // start wall right
            {
                id: 5,
                x: 65 * 1,
                y: 65 * 1,
                collisions: []
            },
            // wall
            {
                id: 6,
                x: 65 * 2,
                y: 65 * 1,
                collisions: [
                    new CollisionInfo(-32, -12, 64 + 32*2, 64 + 12*2, CollisionType.CollisionType_Solid)
                ]
            },
            // roof
            {
                id: 7,
                x: 65 * 3,
                y: 65 * 1,
                collisions: [
                    new CollisionInfo(-32, -12, 64 + 32*2, 64 + 12*2, CollisionType.CollisionType_Solid)
                ]
            },
            // left wall and floor
            {
                id: 8,
                x: 65 * 4,
                y: 65 * 1,
                collisions: []
            },
            // between floor and right wall
            {
                id: 9,
                x: 65 * 1,
                y: 65 * 2,
                collisions: []
            },
            // between left floor and floor
            {
                id: 10,
                x: 65 * 4,
                y: 65 * 2,
                collisions: []
            },
            // up left door
            {
                id: 11,
                x: 391,
                y: 195,
                collisions: []
            },
            // up right door
            {
                id: 12,
                x: 456,
                y: 195,
                collisions: []
            },
            // bottom left door
            {
                id: 13,
                x: 391,
                y: 260,
                collisions: []
            },
            // bottom right door
            {
                id: 14,
                x: 456,
                y: 260,
                collisions: []
            },
            // wall with candle
            {
                id: 15,
                x: 456,
                y: 65,
                collisions: []
            },
            // end wall right
            {
                id: 16,
                x: 521,
                y: 65,
                collisions: []
            },
            // end wall right
            {
                id: 17,
                x: 325,
                y: 325,
                collisions: []
            },
        ]
    },
    bgtiles: {
        src: 'sprites/Level 1.png',
        srcWidth: 715,
        srcHeight: 974,
        w: 64,
        h: 64,
        x_start: 196,
        y_start: 455,
        x_count: 8,
        y_count: 8,
        space_x: 1,
        space_y: 1,
    },
    map: [
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 0
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 1
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 2
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 3
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 4
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 5
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 6
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 7
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 8
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 9
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 10
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 11
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 11  , 12  , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 12
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 13  , 14  , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 3   , 4   , null, null, null, 1   , 2   , 9   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 13
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 14
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , null, null, null, null, null, null, 1   , 2   , 9   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 15
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 16
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, 1   , 2   , 2   , 2   , 9   , 6   , 15  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 17
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 18
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1   , 2   , 9   , 6   , 6   , 15  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 19
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 20
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 15  , 6   , 6   , 6   , 6   , 15  , 6   , 6   , 6   , 6   , 15  , 6   , 6   , 6   , 6   , 15  , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1   , 2   , 9   , 6   , 15  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 21
        [6   , 6   , 6   , 6   , 6   , 6   , 15  , 8   , null, null, null, 16  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 22
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1   , 3   , 4   , null, 1   , 2   , 3   , 4   , null, null, null, null, null, null, null, null, 1   , 2   , 9   , 6   , 15  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 23
        [6   , 6   , 6   , 6   , 6   , 6   , 15  , 11  , 12  , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 8   , null, 5   , 6   , 6   , 10  , 3   , 4   , null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 24
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 13  , 14  , 3   , 4   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1   , 2   , 3   , 4   , null, null, 5   , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 10  , 2   , 2   , 2   , 3   , 4   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 25
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 10  , 2   , 2   , 17  , 3   , 4   , null, null, null, 1   , 2   , 17  , 2   , 2   , 2   , 2   , 2   , 17  , 2   , 2   , 9   , 6   , 6   , 8   , null, null, 16  , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 26
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, 16  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 27
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 10  , 3   , 4   , null, null, null, null, null, null, 5   , 15  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 28
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, 16  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 10  , 2   , 3   , 4   , null, 1   , 2   , 9   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 29
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 10  , 2   , 2   , 3   , 4   , null, null, null, null, 5   , 6   , 15  , 6   , 6   , 6   , 15  , 6   , 6   , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 30
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, 16  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, 5   , 6   , 6   , 15  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 31
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 10  , 3   , 4   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, 16  , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 32
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 16  , 6   , 6   , 6   , 15  , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 33
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 10  , 2   , 3   , 4   , null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 16  , 6   , 6   , 6   , 8   , null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 34
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 10  , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 2   , 3   , 4   , null, null, null, null, null, null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 35
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 10  , 2   , 2   , 2   , 3   , 4   , null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 36
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 8   , null, null, null, null, null, null, null, null, 5   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 37
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 10  , 2   , 2   , 2   , 2   , 17  , 2   , 2   , 2   , 9   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 38
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 39
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 40
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 41
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 42
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 43
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 44
        [6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   , 6   ], // 45
        // 0 , 1   , 2   , 3   , 4   , 5   , 6   , 7   , 8   , 9   , 10  , 11  , 12  , 13  , 14  , 15  , 16  , 17  , 18  , 19  , 20  , 21  , 22  , 23  , 24  , 25  , 26  , 27  , 28  , 29  , 30  , 31  , 32  , 33  , 34  , 35  , 36  , 37  , 38  , 39  , 40  , 41  , 42  , 43  , 44  , 45  , 46  , 47  , 48  , 49  , 50  , 51  , 52  , 53  , 54  , 55  , 56  , 57  , 58  , 59  , 60  , 61  , 62  , 63  , 64  , 65  , 66  , 67  , 68  , 69  , 70  , 71  , 72  , 73  , 74
    ],
    objectInstances: [
        {
            obj: Animations.floor_lamp,
            x: 6 * 64 + 32,
            y: 22 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 6 * 64 + 32,
            y: 24 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 14 * 64 + 32,
            y: 21 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 19 * 64 + 32,
            y: 21 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 24 * 64 + 32,
            y: 21 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 29 * 64 + 32,
            y: 21 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 25 * 64 + 32,
            y: 28 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 28 * 64 + 32,
            y: 30 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 32 * 64 + 32,
            y: 30 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 41 * 64 + 32,
            y: 31 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 48 * 64 + 32,
            y: 33 * 64 + 32,
        },
        {
            obj: Animations.floor_lamp,
            x: 36 * 64 + 32,
            y: 23 * 64 + 8,
        },
        {
            obj: Animations.floor_lamp,
            x: 37 * 64 + 43,
            y: 23 * 64 + 8,
        },

        {
            obj: Animations.candle,
            x: 11 * 64,
            y: 25 * 64,
        },
        {
            obj: Animations.candle,
            x: 32 * 64,
            y: 34 * 64,
        },

        {
            obj: Animations.candle,
            x: 49 * 64,
            y: 37 * 64,
        },

        {
            obj: Animations.candle,
            x: 49 * 64,
            y: 24 * 64,
        },

        {
            obj: Animations.hand,
            x: 29 * 64,
            y: 35 * 64,
        },
        {
            obj: Animations.hand,
            x: 34 * 64,
            y: 35 * 64,
        },
        {
            obj: Animations.hand,
            x: 46 * 64,
            y: 38 * 64,
        },

        {
            obj: Animations.web_left,
            x: 7 * 64,
            y: 22 * 64,
        },
        {
            obj: Animations.web_right,
            x: 11 * 64,
            y: 22 * 64,
        },
        {
            obj: Animations.web_big,
            x: 32 * 64,
            y: 20 * 64,
        },
        {
            obj: Animations.web_big,
            x: 56 * 64,
            y: 15 * 64,
        },

        {
            obj: Animations.column_center,
            x: 13 * 64,
            y: 23 * 64,
        },
        {
            obj: Animations.column_repeated,
            x: 13 * 64,
            y: 24 * 64,
        },
        {
            obj: Animations.column_repeated,
            x: 13 * 64,
            y: 25 * 64,
        },

        {
            obj: Animations.column_center,
            x: 21 * 64,
            y: 23 * 64,
        },
        {
            obj: Animations.column_repeated,
            x: 21 * 64,
            y: 24 * 64,
        },
        {
            obj: Animations.column_repeated,
            x: 21 * 64,
            y: 25 * 64,
        },

        {
            obj: Animations.column_center,
            x: 27 * 64,
            y: 23 * 64,
        },
        {
            obj: Animations.column_repeated,
            x: 27 * 64,
            y: 24 * 64,
        },
        {
            obj: Animations.column_repeated,
            x: 27 * 64,
            y: 25 * 64,
        },

        {
            obj: Animations.column_center,
            x: 48 * 64,
            y: 35 * 64,
        },
        {
            obj: Animations.column_repeated,
            x: 48 * 64,
            y: 36 * 64,
        },
        {
            obj: Animations.column_repeated,
            x: 48 * 64,
            y: 37 * 64,
        },
        // {
        //     obj: Animations.column_bottom,
        //     x: 13 * 64,
        //     y: 26 * 64 - 32,
        // },

        {
            obj: Animations.chain,
            x: 22 * 64,
            y: 28 * 64,
        },
        {
            obj: Animations.chain,
            x: 22 * 64 + 35,
            y: 28 * 64,
        },

        {
            obj: Animations.chain,
            x: 37 * 64,
            y: 27 * 64,
        },
        {
            obj: Animations.chain,
            x: 37 * 64 + 35,
            y: 27 * 64,
        },

        {
            obj: Animations.chain,
            x: 55 * 64,
            y: 16 * 64,
        },
        {
            obj: Animations.chain,
            x: 55 * 64 - 35,
            y: 16 * 64,
        },
    ],
    soundTriggerInstances: [
        {
            x: 51*64,
            y: 32*64,
            w: 64*3,
            h: 64,
            sound: Sounds.claw_allDay,
        },
        {
            x: 40*64,
            y: 12*64,
            w: 64,
            h: 64*3,
            sound: Sounds.claw_goldSmell,
        },
        {
            x: 37*64,
            y: 29*64,
            w: 64*3,
            h: 64,
            sound: Sounds.claw_path,
        },
        {
            x: 62*64,
            y: 13*64,
            w: 64*3,
            h: 64,
            sound: Sounds.claw_pointless,
        },
        {
            x: 42*64,
            y: 21*64,
            w: 64,
            h: 64*3,
            sound: Sounds.claw_soFarSoGood,
        },
        {
            x: 19*64,
            y: 12*64,
            w: 64,
            h: 64*3,
            sound: Sounds.claw_exercises,
        },
    ],
    treasureInstances: [
        {
            x: 37*64,
            y: 22*64,
            type: PickupType.COIN,
        },
        {
            x: 37*64 - 25,
            y: 22*64 - 10,
            type: PickupType.COIN,
        },
        {
            x: 37*64,
            y: 22*64 - 20,
            type: PickupType.COIN,
        },
        {
            x: 37*64 - 25,
            y: 22*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 37*64,
            y: 22*64 - 40,
            type: PickupType.COIN,
        },
        {
            x: 37*64 - 25,
            y: 22*64 - 50,
            type: PickupType.COIN,
        },
        {
            x: 37*64,
            y: 22*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 37*64 - 25,
            y: 22*64 - 70,
            type: PickupType.COIN,
        },
        {
            x: 37*64,
            y: 22*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 37*64 - 25,
            y: 22*64 - 100,
            type: PickupType.COIN,
        },
        {
            x: 37*64 - 15,
            y: 22*64 - 160,
            type: PickupType.CHALICE,
        },
        {
            x: 38*64 - 25,
            y: 20*64,
            type: PickupType.GECKO,
        },
        {
            x: 36*64,
            y: 20*64,
            type: PickupType.GECKO,
        },




        {
            x: 46*64,
            y: 22*64,
            type: PickupType.COIN,
        },
        {
            x: 46*64 + 25,
            y: 22*64 - 10,
            type: PickupType.COIN,
        },
        {
            x: 46*64,
            y: 22*64 - 20,
            type: PickupType.COIN,
        },
        {
            x: 46*64 + 25,
            y: 22*64 - 30,
            type: PickupType.COIN,
        },

        {
            x: 47*64 + 32,
            y: 22*64 - 40,
            type: PickupType.SKULL,
        },
        {
            x: 47*64,
            y: 22*64 - 25,
            type: PickupType.CROSS,
        },
        {
            x: 48*64,
            y: 22*64 - 25,
            type: PickupType.CROSS,
        },
        {
            x: 47*64 + 32,
            y: 22*64,
            type: PickupType.CROSS,
        },

        {
            x: 49*64,
            y: 22*64,
            type: PickupType.COIN,
        },
        {
            x: 49*64 + 25,
            y: 22*64 - 10,
            type: PickupType.COIN,
        },
        {
            x: 49*64,
            y: 22*64 - 20,
            type: PickupType.COIN,
        },
        {
            x: 49*64 + 25,
            y: 22*64 - 30,
            type: PickupType.COIN,
        },


        {
            x: 52*64,
            y: 21*64,
            type: PickupType.SCEPTER,
        },
        {
            x: 53*64,
            y: 20*64,
            type: PickupType.SCEPTER,
        },
        {
            x: 54*64,
            y: 19*64,
            type: PickupType.SCEPTER,
        },
        {
            x: 55*64,
            y: 18*64,
            type: PickupType.SCEPTER,
        },
        {
            x: 56*64,
            y: 17*64,
            type: PickupType.SCEPTER,
        },
        {
            x: 57*64,
            y: 16*64,
            type: PickupType.SCEPTER,
        },
        {
            x: 58*64,
            y: 15*64,
            type: PickupType.SCEPTER,
        },


        {
            x: 51*64,
            y: 25*64,
            type: PickupType.GOLD_BAR,
        },
        {
            x: 51*64,
            y: 26*64,
            type: PickupType.CROWN,
        },
        {
            x: 51*64,
            y: 27*64,
            type: PickupType.GOLD_BAR,
        },
        {
            x: 51*64,
            y: 28*64,
            type: PickupType.CROWN,
        },
        {
            x: 51*64,
            y: 29*64,
            type: PickupType.GOLD_BAR,
        },
        {
            x: 51*64,
            y: 30*64,
            type: PickupType.CROWN,
        },
        {
            x: 51*64,
            y: 31*64,
            type: PickupType.GOLD_BAR,
        },
        {
            x: 51*64,
            y: 32*64,
            type: PickupType.CROWN,
        },
        {
            x: 51*64,
            y: 35*64,
            type: PickupType.SKULL,
        },
        {
            x: 51*64,
            y: 36*64,
            type: PickupType.SCEPTER,
        },
        {
            x: 51*64,
            y: 37*64,
            type: PickupType.SKULL,
        },



        {
            x: 49*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 49*64 - 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 49*64 - 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 49*64 - 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 49*64 - 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },
        {
            x: 47*64 + 32,
            y: 12*64 - 160,
            type: PickupType.RING,
        },
        {
            x: 46*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 46*64 + 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 46*64 + 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 46*64 + 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 46*64 + 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },


        {
            x: 45*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 45*64 - 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 45*64 - 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 45*64 - 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 45*64 - 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },
        {
            x: 43*64 + 32,
            y: 12*64 - 160,
            type: PickupType.CHALICE,
        },
        {
            x: 42*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 42*64 + 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 42*64 + 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 42*64 + 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 42*64 + 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },


        {
            x: 41*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 41*64 - 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 41*64 - 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 41*64 - 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 41*64 - 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },
        {
            x: 39*64 + 32,
            y: 12*64 - 160,
            type: PickupType.SKULL,
        },
        {
            x: 38*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 38*64 + 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 38*64 + 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 38*64 + 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 38*64 + 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },


        {
            x: 37*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 37*64 - 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 37*64 - 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 37*64 - 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 37*64 - 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },
        {
            x: 35*64 + 32,
            y: 12*64 - 160,
            type: PickupType.CROSS,
        },
        {
            x: 34*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 34*64 + 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 34*64 + 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 34*64 + 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 34*64 + 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },



        {
            x: 33*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 33*64 - 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 33*64 - 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 33*64 - 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 33*64 - 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },
        {
            x: 31*64 + 32,
            y: 12*64 - 160,
            type: PickupType.CROWN,
        },
        {
            x: 30*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 30*64 + 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 30*64 + 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 30*64 + 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 30*64 + 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },


        {
            x: 29*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 29*64 - 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 29*64 - 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 29*64 - 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 29*64 - 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },
        {
            x: 27*64 + 32,
            y: 12*64 - 160,
            type: PickupType.GECKO,
        },
        {
            x: 26*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 26*64 + 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 26*64 + 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 26*64 + 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 26*64 + 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },


        {
            x: 25*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 25*64 - 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 25*64 - 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 25*64 - 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 25*64 - 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },
        {
            x: 23*64 + 32,
            y: 12*64 - 160,
            type: PickupType.SCEPTER,
        },
        {
            x: 22*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 22*64 + 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 22*64 + 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 22*64 + 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 22*64 + 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },



        {
            x: 21*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 21*64 - 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 21*64 - 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 21*64 - 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 21*64 - 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },
        {
            x: 19*64 + 32,
            y: 12*64 - 160,
            type: PickupType.GOLD_BAR,
        },
        {
            x: 18*64,
            y: 12*64,
            type: PickupType.COIN,
        },
        {
            x: 18*64 + 20,
            y: 12*64 - 30,
            type: PickupType.COIN,
        },
        {
            x: 18*64 + 40,
            y: 12*64 - 60,
            type: PickupType.COIN,
        },
        {
            x: 18*64 + 60,
            y: 12*64 - 90,
            type: PickupType.COIN,
        },
        {
            x: 18*64 + 80,
            y: 12*64 - 120,
            type: PickupType.COIN,
        },

        {
            x: 17*64,
            y: 12*64,
            type: PickupType.RING,
        },
        {
            x: 17*64,
            y: 12*64 - 40,
            type: PickupType.RING,
        },
        {
            x: 17*64,
            y: 12*64 - 80,
            type: PickupType.RING,
        },

        {
            x: 16*64,
            y: 12*64,
            type: PickupType.CHALICE,
        },
        {
            x: 16*64,
            y: 12*64 - 40,
            type: PickupType.CHALICE,
        },
        {
            x: 16*64,
            y: 12*64 - 80,
            type: PickupType.CHALICE,
        },

        {
            x: 15*64,
            y: 12*64,
            type: PickupType.SKULL,
        },
        {
            x: 15*64,
            y: 12*64 - 40,
            type: PickupType.SKULL,
        },
        {
            x: 15*64,
            y: 12*64 - 80,
            type: PickupType.SKULL,
        },

        {
            x: 14*64,
            y: 12*64,
            type: PickupType.CROSS,
        },
        {
            x: 14*64,
            y: 12*64 - 40,
            type: PickupType.CROSS,
        },
        {
            x: 14*64,
            y: 12*64 - 80,
            type: PickupType.CROSS,
        },

        {
            x: 13*64,
            y: 12*64,
            type: PickupType.CROWN,
        },
        {
            x: 13*64,
            y: 12*64 - 40,
            type: PickupType.CROWN,
        },
        {
            x: 13*64,
            y: 12*64 - 80,
            type: PickupType.CROWN,
        },

        {
            x: 12*64,
            y: 12*64,
            type: PickupType.GECKO,
        },
        {
            x: 12*64,
            y: 12*64 - 40,
            type: PickupType.GECKO,
        },
        {
            x: 12*64,
            y: 12*64 - 80,
            type: PickupType.GECKO,
        },

        {
            x: 11*64,
            y: 12*64,
            type: PickupType.SCEPTER,
        },
        {
            x: 11*64,
            y: 12*64 - 40,
            type: PickupType.SCEPTER,
        },
        {
            x: 11*64,
            y: 12*64 - 80,
            type: PickupType.SCEPTER,
        },

        {
            x: 10*64,
            y: 12*64,
            type: PickupType.GOLD_BAR,
        },
        {
            x: 10*64,
            y: 12*64 - 40,
            type: PickupType.GOLD_BAR,
        },
        {
            x: 10*64,
            y: 12*64 - 80,
            type: PickupType.GOLD_BAR,
        },
    ],
    officerInstances: [
        {
            spawnX: 12*64,
            spawnY: 25*64,
            borderLeft: 11*64,
            borderRight: 14*64,
            loot: undefined,
        },
        {
            spawnX: 30*64,
            spawnY: 34*64,
            borderLeft: 27*64,
            borderRight: 32*64,
        },
        {
            spawnX: 34*64,
            spawnY: 34*64,
            borderLeft: 33*64,
            borderRight: 37*64,
        },
        {
            spawnX: 51*64,
            spawnY: 37*64,
            borderLeft: 44*64,
            borderRight: 51*64,
        },
        {
            spawnX: 59*64,
            spawnY: 12*64,
            borderLeft: 55*64,
            borderRight: 59*64,
        },
        {
            spawnX: 59*64,
            spawnY: 12*64,
            borderLeft: 53*64,
            borderRight: 58*64,
        },
        {
            spawnX: 50*64,
            spawnY: 12*64,
            borderLeft: 50*64,
            borderRight: 56*64,
        },
        {
            spawnX: 57*64,
            spawnY: 12*64,
            borderLeft: 50*64,
            borderRight: 59*64,
        },
        {
            spawnX: 54*64,
            spawnY: 12*64,
            borderLeft: 51*64,
            borderRight: 57*64,
        },
    ],
    crateInstances: [
        {
            spawnX: 25*64 - 44,
            spawnY: 25*64,
        },
        {
            spawnX: 24*64 - 22,
            spawnY: 25*64,
        },
        {
            spawnX: 23*64,
            spawnY: 25*64,
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
        },
        {
            spawnX: 25*64 - 44,
            spawnY: 24*64,
        },
        {
            spawnX: 24*64 - 22,
            spawnY: 24*64,
        },
        {
            spawnX: 23*64,
            spawnY: 24*64,
        },
        {
            spawnX: 24*64 - 22,
            spawnY: 23*64,
        },


        {
            spawnX: 40*64,
            spawnY: 35*64,
        },
        {
            spawnX: 40*64,
            spawnY: 34*64,
        },
        {
            spawnX: 41*64,
            spawnY: 35*64,
        },
        {
            spawnX: 41*64,
            spawnY: 34*64,
        },

        {
            spawnX: 65*64,
            spawnY: 12*64,
        },
        {
            spawnX: 65*64,
            spawnY: 11*64,
        },
        {
            spawnX: 65*64,
            spawnY: 10*64,
        },
        {
            spawnX: 65*64,
            spawnY: 9*64,
        },
        {
            spawnX: 65*64,
            spawnY: 8*64,
        },
        {
            spawnX: 65*64,
            spawnY: 7*64,
        },
        {
            spawnX: 65*64,
            spawnY: 6*64,
        },
        {
            spawnX: 65*64,
            spawnY: 5*64,
        },
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
    finish: {
        x: 8 * 64,
        y: 10 * 64,
        anim: Animations.level_end,
        sound: Sounds.level_finish,
    },
    player: {
        spawnX: 64 * 8,
        spawnY: 64 * 24,
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
        },
        {
            type: PickupType.CHALICE,
            pickupSound: Sounds.treasure_chalice,
            score: 1000,
            w: 26,
            h: 33,
            anims: [
                {
                    name: Animations.treasureChaliceRed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 1,
                            y: 0,
                            cx: 13,
                            cy: 16,
                            w: 26,
                            h: 33,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureChaliceBlue,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 29,
                            y: 0,
                            cx: 13,
                            cy: 16,
                            w: 26,
                            h: 33,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureChaliceGreed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 57,
                            y: 0,
                            cx: 13,
                            cy: 16,
                            w: 26,
                            h: 33,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureChalicePink,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 85,
                            y: 0,
                            cx: 13,
                            cy: 16,
                            w: 26,
                            h: 33,
                            delay: 500000,
                        },
                    ]
                },
            ]
        },
        {
            type: PickupType.CROSS,
            pickupSound: Sounds.treasure_cross,
            score: 1000,
            w: 25,
            h: 37,
            anims: [
                {
                    name: Animations.treasureCrossRed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 1,
                            y: 65,
                            cx: 12,
                            cy: 18,
                            w: 25,
                            h: 37,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureCrossBlue,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 29,
                            y: 65,
                            cx: 12,
                            cy: 18,
                            w: 25,
                            h: 37,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureCrossGreed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 57,
                            y: 65,
                            cx: 12,
                            cy: 18,
                            w: 25,
                            h: 37,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureCrossPink,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 85,
                            y: 65,
                            cx: 12,
                            cy: 18,
                            w: 25,
                            h: 37,
                            delay: 500000,
                        },
                    ]
                },
            ]
        },
        {
            type: PickupType.CROWN,
            pickupSound: Sounds.treasure_crown,
            score: 1000,
            w: 36,
            h: 30,
            anims: [
                {
                    name: Animations.treasureCrownRed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 1,
                            y: 104,
                            cx: 18,
                            cy: 15,
                            w: 36,
                            h: 30,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureCrownBlue,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 39,
                            y: 104,
                            cx: 18,
                            cy: 15,
                            w: 36,
                            h: 30,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureCrownGreed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 77,
                            y: 104,
                            cx: 18,
                            cy: 15,
                            w: 36,
                            h: 30,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureCrownPink,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 115,
                            y: 104,
                            cx: 18,
                            cy: 15,
                            w: 36,
                            h: 30,
                            delay: 500000,
                        },
                    ]
                },
            ]
        },
        {
            type: PickupType.GECKO,
            pickupSound: Sounds.treasure_gecko,
            score: 1000,
            w: 36,
            h: 36,
            anims: [
                {
                    name: Animations.treasureGeckoRed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 1,
                            y: 176,
                            cx: 18,
                            cy: 18,
                            w: 36,
                            h: 36,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureGeckoBlue,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 39,
                            y: 176,
                            cx: 18,
                            cy: 18,
                            w: 36,
                            h: 36,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureGeckoGreed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 77,
                            y: 176,
                            cx: 18,
                            cy: 18,
                            w: 36,
                            h: 36,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureGeckoPink,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 115,
                            y: 176,
                            cx: 18,
                            cy: 18,
                            w: 36,
                            h: 36,
                            delay: 500000,
                        },
                    ]
                },
            ]
        },
        {
            type: PickupType.SKULL,
            pickupSound: Sounds.treasure_skull,
            score: 1000,
            w: 34,
            h: 35,
            anims: [
                {
                    name: Animations.treasureSkullRed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 1,
                            y: 214,
                            cx: 17,
                            cy: 17,
                            w: 34,
                            h: 35,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureSkullBlue,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 37,
                            y: 214,
                            cx: 17,
                            cy: 17,
                            w: 34,
                            h: 35,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureSkullGreed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 73,
                            y: 214,
                            cx: 17,
                            cy: 17,
                            w: 34,
                            h: 35,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureSkullPink,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 109,
                            y: 214,
                            cx: 17,
                            cy: 17,
                            w: 34,
                            h: 35,
                            delay: 500000,
                        },
                    ]
                },
            ]
        },
        {
            type: PickupType.SCEPTER,
            pickupSound: Sounds.treasure_scepter,
            score: 1000,
            w: 36,
            h: 36,
            anims: [
                {
                    name: Animations.treasureScepterRed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 1,
                            y: 280,
                            cx: 18,
                            cy: 18,
                            w: 36,
                            h: 36,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureScepterBlue,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 39,
                            y: 280,
                            cx: 18,
                            cy: 18,
                            w: 36,
                            h: 36,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureScepterGreed,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 77,
                            y: 280,
                            cx: 18,
                            cy: 18,
                            w: 36,
                            h: 36,
                            delay: 500000,
                        },
                    ]
                },
                {
                    name: Animations.treasureScepterPink,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 115,
                            y: 280,
                            cx: 18,
                            cy: 18,
                            w: 36,
                            h: 36,
                            delay: 500000,
                        },
                    ]
                },
            ]
        },
        {
            type: PickupType.GOLD_BAR,
            pickupSound: Sounds.treasure_goldbar,
            score: 1000,
            w: 40,
            h: 26,
            anims: [
                {
                    name: Animations.treasureGoldBar,
                    src: 'sprites/treasure.png',
                    srcWidth: 313,
                    srcHeight: 365,
                    map: [
                        {
                            id: 0,
                            x: 190,
                            y: 326,
                            cx: 20,
                            cy: 18,
                            w: 40,
                            h: 26,
                            delay: 500000,
                        },
                    ]
                },
            ]
        },
    ],
    levelItems: [
        {
            name: Animations.candle,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            oy: -10,
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
                    cx: 26,
                    cy: 62,
                    w: 51,
                    h: 124,
                    delay: 300,
                },
            ]
        },
        {
            name: Animations.chain,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            map: [
                {
                    id: 0,
                    x: 4,
                    y: 478,
                    w: 20,
                    h: 72,
                    cx: 7,
                    cy: 33,
                    delay: 300,
                },
                {
                    id: 1,
                    x: 30,
                    y: 478,
                    w: 20,
                    h: 72,
                    cx: 9,
                    cy: 33,
                    delay: 300,
                },
                {
                    id: 2,
                    x: 56,
                    y: 478,
                    w: 20,
                    h: 72,
                    cx: 11,
                    cy: 33,
                    delay: 300,
                },
                {
                    id: 3,
                    x: 80,
                    y: 478,
                    w: 21,
                    h: 72,
                    cx: 13,
                    cy: 33,
                    delay: 300,
                },
                {
                    id: 4,
                    x: 104,
                    y: 478,
                    w: 20,
                    h: 72,
                    cx: 11,
                    cy: 33,
                    delay: 300,
                },
                {
                    id: 5,
                    x: 129,
                    y: 478,
                    w: 20,
                    h: 72,
                    cx: 9,
                    cy: 33,
                    delay: 300,
                },
                {
                    id: 6,
                    x: 153,
                    y: 478,
                    w: 20,
                    h: 72,
                    cx: 7,
                    cy: 33,
                    delay: 300,
                },
            ]
        },
        {
            name: Animations.column_center,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            map: [
                {
                    id: 0,
                    x: 106,
                    y: 1,
                    w: 124,
                    h: 64,
                    cx: 59 + 7,
                    cy: 32,
                    delay: 3000000,
                },
            ]
        },
        {
            name: Animations.column_repeated,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            map: [
                {
                    id: 0,
                    x: 154,
                    y: 67,
                    w: 22,
                    h: 64,
                    cx: 11 + 7,
                    cy: 32,
                    delay: 3000000,
                },
            ]
        },
        {
            name: Animations.column_bottom,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            map: [
                {
                    id: 0,
                    x: 265,
                    y: 67,
                    w: 50,
                    h: 64,
                    cx: 27 + 7,
                    cy: 32,
                    delay: 3000000,
                },
            ]
        },
        {
            name: Animations.floor_lamp,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            map: [
                {
                    id: 0,
                    x: 217,
                    y: 527,
                    w: 16,
                    h: 27,
                    cx: 43,
                    cy: 32,
                    delay: 150,
                },
                {
                    id: 1,
                    x: 238,
                    y: 521,
                    w: 16,
                    h: 33,
                    cx: 43,
                    cy: 38,
                    delay: 150,
                },
                {
                    id: 2,
                    x: 258,
                    y: 520,
                    w: 16,
                    h: 34,
                    cx: 43,
                    cy: 39,
                    delay: 150,
                },
                {
                    id: 3,
                    x: 276,
                    y: 525,
                    w: 16,
                    h: 29,
                    cx: 43,
                    cy: 34,
                    delay: 150,
                },
            ]
        },
        {
            name: Animations.web_big,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            ox: 32,
            oy: 31,
            map: [
                {
                    id: 0,
                    x: 416,
                    y: 2,
                    w: 90,
                    h: 46,
                    cx: 0,
                    cy: 0,
                    delay: 3000000000,
                },
            ]
        },
        {
            name: Animations.web_right,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            map: [
                {
                    id: 0,
                    x: 523,
                    y: 1,
                    w: 52,
                    h: 58,
                    cx: 20,
                    cy: 36,
                    delay: 3000000000,
                },
            ]
        },
        {
            name: Animations.web_left,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            map: [
                {
                    id: 0,
                    x: 595,
                    y: 0,
                    w: 52,
                    h: 58,
                    cx: 3,
                    cy: 30,
                    delay: 3000000000,
                },
            ]
        },
        {
            name: Animations.hand,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            oy: -32,
            map: [
                {
                    id: 0,
                    x: 3,
                    y: 414,
                    w: 112,
                    h: 43,
                    cx: 56,
                    cy: 32,
                    delay: 300,
                },
                {
                    id: 1,
                    x: 118,
                    y: 414,
                    w: 112,
                    h: 55,
                    cx: 56,
                    cy: 44,
                    delay: 300,
                },
                {
                    id: 2,
                    x: 233,
                    y: 414,
                    w: 112,
                    h: 46,
                    cx: 56,
                    cy: 32,
                    delay: 300,
                },
                {
                    id: 3,
                    x: 350,
                    y: 414,
                    w: 112,
                    h: 61,
                    cx: 55,
                    cy: 50,
                    delay: 300,
                },
            ]
        },
        {
            name: Animations.crate,
            src: 'sprites/level 1 Objects.png',
            srcWidth: 1399,
            srcHeight: 857,
            ox: 8,
            oy: 10,
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
        },
        {
            name: Animations.level_end,
            src: 'sprites/warp.png',
            srcWidth: 756,
            srcHeight: 196,
            map: [
                {
                    id: 0,
                    x: 2,
                    y: 158,
                    w: 35,
                    h: 38,
                    cx: 0,
                    cy: 3,
                    delay: 150,
                },
                {
                    id: 1,
                    x: 42,
                    y: 158,
                    w: 38,
                    h: 38,
                    cx: 0,
                    cy: 2,
                    delay: 150,
                },
                {
                    id: 2,
                    x: 85,
                    y: 156,
                    w: 36,
                    h: 40,
                    cx: 0,
                    cy: 3,
                    delay: 150,
                },
                {
                    id: 3,
                    x: 125,
                    y: 162,
                    w: 39,
                    h: 34,
                    cx: 0,
                    cy: 0,
                    delay: 150,
                },
            ]
        },
        // TODO: do we need it here???
        {
            name: Animations.ui_health,
            src: 'sprites/health_ui.png',
            srcWidth: 0,
            srcHeight: 0,
            w: 66,
            h: 24,
            map: [
                {
                    id: 0,
                    x: 0,
                    y: 24 * 0,
                    cx: 0,
                    cy: 0,
                    delay: 200,
                },
                {
                    id: 1,
                    x: 0,
                    y: 24 * 1,
                    cx: 0,
                    cy: 0,
                    delay: 200,
                },
                {
                    id: 2,
                    x: 0,
                    y: 24 * 2,
                    cx: 0,
                    cy: 0,
                    delay: 200,
                },
            ]
        },
        {
            name: Animations.ui_points,
            src: 'sprites/points.png',
            srcWidth: 0,
            srcHeight: 0,
            map: [
                {
                    id: 0,
                    x: 0,
                    y: 0,
                    w: 120,
                    h: 54,
                    cx: 0,
                    cy: 0,
                    delay: 30000000,
                },
            ]
        },
        {
            name: Animations.ui_treasure,
            src: 'sprites/UI treasure.png',
            srcWidth: 0,
            srcHeight: 0,
            w: 29,
            h: 28,
            map: [
                {
                    id: 0,
                    x: 29 * 0,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 1,
                    x: 29 * 1,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 2,
                    x: 29 * 2,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 3,
                    x: 29 * 3,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 4,
                    x: 29 * 4,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 5,
                    x: 29 * 5,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 6,
                    x: 29 * 6,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 7,
                    x: 29 * 7,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 8,
                    x: 29 * 8,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 9,
                    x: 29 * 9,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 10,
                    x: 29 * 10,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 11,
                    x: 29 * 11,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 12,
                    x: 29 * 12,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 13,
                    x: 29 * 13,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 14,
                    x: 29 * 14,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 15,
                    x: 29 * 15,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 16,
                    x: 29 * 16,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 17,
                    x: 29 * 17,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 18,
                    x: 29 * 18,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 19,
                    x: 29 * 19,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 20,
                    x: 29 * 20,
                    y: 0,
                    delay: 150,
                },
                {
                    id: 21,
                    x: 29 * 21,
                    y: 0,
                    delay: 150,
                },
            ]
        },
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
            name: Sounds.claw_killEnemy2,
            src: 'sounds/claw_killEnemy2.mp3'
        },
        {
            name: Sounds.claw_killEnemy3,
            src: 'sounds/claw_killEnemy3.mp3'
        },
        {
            name: Sounds.claw_death,
            src: 'sounds/claw_death.mp3'
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
            name: Sounds.treasure_chalice,
            src: 'sounds/pickup1.mp3'
        },
        {
            name: Sounds.treasure_cross,
            src: 'sounds/cross.mp3'
        },
        {
            name: Sounds.treasure_crown,
            src: 'sounds/pickup2.mp3'
        },
        {
            name: Sounds.treasure_gecko,
            src: 'sounds/pickup1.mp3'
        },
        {
            name: Sounds.treasure_skull,
            src: 'sounds/pickup2.mp3'
        },
        {
            name: Sounds.treasure_scepter,
            src: 'sounds/scepter.mp3'
        },
        {
            name: Sounds.treasure_goldbar,
            src: 'sounds/treasure.mp3'
        },
        {
            name: Sounds.crate_break1,
            src: 'sounds/cratebreak1.mp3'
        },
        {
            name: Sounds.crate_break2,
            src: 'sounds/cratebreak2.mp3'
        },
        {
            name: Sounds.level_music,
            src: 'sounds/level_music.mp3'
        },
        {
            name: Sounds.claw_soFarSoGood,
            src: 'sounds/claw_soFarSoGood.mp3'
        },
        {
            name: Sounds.claw_pointless,
            src: 'sounds/claw_pointless.mp3'
        },
        {
            name: Sounds.claw_path,
            src: 'sounds/claw_path.mp3'
        },
        {
            name: Sounds.claw_goldSmell,
            src: 'sounds/claw_goldSmell.mp3'
        },
        {
            name: Sounds.claw_allDay,
            src: 'sounds/claw_allDay.mp3'
        },
        {
            name: Sounds.claw_exercises,
            src: 'sounds/claw_exercises.mp3'
        },
        {
            name: Sounds.level_finish,
            src: 'sounds/level_finish.mp3'
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

export interface GridTile {
    src: string;
    srcWidth: number;
    srcHeight: number;
    w: number;
    h: number;
    x_start: number;
    y_start: number;
    x_count: number;
    y_count: number;
    space_x: number;
    space_y: number;
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

export interface SpriteDefinition {
    id: string;
    rect: Rect;
    srcWidth: number;
    srcHeight: number;
    src: string;
}
