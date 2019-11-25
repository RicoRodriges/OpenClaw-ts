export default class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    SetZero() {
        this.x = 0;
        this.y = 0;
    }
}
