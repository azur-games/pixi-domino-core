import {Direction} from "../logic/Direction";
import {Position} from "../logic/Position";
import {Vector} from "../logic/Vector";
import {DominoNumber} from "./DominoNumber";


export interface DominoItem {
    moveY: number;
    moveX: number;
    pieceData:{pivot: boolean};
    y: number;
    x: number;
    moveDirection: Direction;
    topDirectionOpened: boolean;
    top: DominoNumber;
    double: boolean;

    getDirectionVectorOld(position: Position, direction: Direction, nextDouble: boolean): Vector;
}