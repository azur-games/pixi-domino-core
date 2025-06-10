import {Direction, DirectionTurn} from "./Direction";
import {Position} from "./Position";


export class PositionDirectionDirectionTurn {
    constructor(public position: Position, public direction: Direction, public directionTurn: DirectionTurn) {
    }
}