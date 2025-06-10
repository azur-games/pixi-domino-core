import {Point} from "pixi.js";
import {Direction} from "./Direction";


export class CoorsAndCorner extends Point {
    constructor(x: number, y: number, public direction: Direction) {
        super(x, y);
    }

    getAddingAngle() {
        switch ((this.direction + 1) % 4) {
            case Direction.RIGHT:
                return Math.PI / 2;
            case Direction.LEFT:
                return -Math.PI / 2;
            case Direction.DOWN:
                return Math.PI;
            default:
                return 0;
        }
    }
}