export default class Point {
    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }

    SetZero() {
        this.x = 0;
        this.y = 0;
    }
}
