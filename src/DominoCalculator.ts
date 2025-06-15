import {Point} from "pixi.js";
import {CoorsAndCorner} from "./logic/CoorsAndCorner";
import {Direction, DirectionTurn} from "./logic/Direction";
import {Position} from "./logic/Position";
import {PositionDirectionDirectionTurn} from "./logic/PositionDirectionDirectionTurn";
import {Vector} from "./logic/Vector";
import {DominoItem} from "./types/DominoItem";
import {GameMode} from "./types/GameMode";
import {PieceRot} from "./types/IPieceData";
import {IPieceJointData} from "./types/IPieceJointData";


export class DominoCalculator {

    static directionsSum(direction1: Direction, direction2: Direction): Direction {
        return (direction1 + direction2) % 4 as Direction;
    }

    static getMaxWidthAndHeight(gameMode: GameMode): Point {
        return gameMode == GameMode.PRO ? new Point(37, 11) : new Point(40, 9);//для портрета примерно Point(10,60)
    }

    static getCoorsAndCorner(nextDominoItem: DominoItem, prevDominoItem: DominoItem, positionDirectionDirectionTurn: PositionDirectionDirectionTurn): CoorsAndCorner {
        let direction: Direction = positionDirectionDirectionTurn.direction;
        if (prevDominoItem) {
            if (positionDirectionDirectionTurn.directionTurn != Direction.NONE) {
                direction = DominoCalculator.directionsSum(positionDirectionDirectionTurn.directionTurn, direction);
            }
            let directionsSum: Direction = DominoCalculator.directionsSum(prevDominoItem.moveDirection, direction);
            let finalDirectionVector: Vector = prevDominoItem.getDirectionVectorOld(positionDirectionDirectionTurn.position, direction, nextDominoItem.double).add(new Vector(prevDominoItem.moveX, prevDominoItem.moveY));
            return new CoorsAndCorner(finalDirectionVector.x, finalDirectionVector.y, directionsSum);
        }
        return new CoorsAndCorner(0, 0, Direction.UP);
    }

    static getPositionDirectionDirectionTurn(joint: IPieceJointData, prevDominoItem: DominoItem, nextDominoItem: DominoItem, tableDominoes: DominoItem[], gameMode: GameMode): PositionDirectionDirectionTurn {
        let direction: Direction;
        let directionTurn: DirectionTurn = Direction.NONE;
        let position: Position;
        if (joint) {
            if (prevDominoItem.double) {
                if (tableDominoes.length == 1) {
                    switch (joint.dir) {
                        case PieceRot.RIGHT:
                            direction = Direction.UP;
                            break;
                        case PieceRot.LEFT:
                            direction = Direction.DOWN;
                            break;
                    }
                } else {
                    if (joint.additional) {
                        direction = joint.dir == PieceRot.DOWN ? Direction.RIGHT : Direction.LEFT;
                    } else {
                        direction = prevDominoItem.topDirectionOpened ? Direction.UP : Direction.DOWN;
                    }

                }
            } else {
                switch (tableDominoes.length) {
                    case 0:
                        direction = Direction.UP;
                        break;
                    default:
                        direction = prevDominoItem.top == joint.joinValue ? Direction.UP : Direction.DOWN;
                        break;
                }
            }

            directionTurn = this.getDirectionTurn(prevDominoItem, nextDominoItem, tableDominoes, gameMode);
            position = prevDominoItem.double ? Position.CENTER : direction == Direction.DOWN ? Position.BOTTOM : Position.TOP;
        }

        return new PositionDirectionDirectionTurn(position, direction, directionTurn);
    }

    static getDirectionTurn(prevDominoItem: DominoItem, nextDominoItem: DominoItem, tableDominoes: DominoItem[], gameMode: GameMode): DirectionTurn {
        let minX: number = 0;
        let maxX: number = 0;
        let minY: number = 0;
        let maxY: number = 0;
        tableDominoes.forEach(dominoItem => {
            minX = Math.min(minX, dominoItem.x);
            maxX = Math.max(maxX, dominoItem.x);
            minY = Math.min(minY, dominoItem.y);
            maxY = Math.max(maxY, dominoItem.y);
        });

        if (!nextDominoItem.double) {
            //загиб колбасы
            if (gameMode == GameMode.FIVES) {
                let spinner: DominoItem = tableDominoes.find(tableDomino => tableDomino.pieceData.pivot);
                if (spinner) {
                    if (Math.abs(prevDominoItem.x - spinner.x) < .1) {
                        if (prevDominoItem.y < -3) {
                            return Math.abs(spinner.x - minX) < Math.abs(spinner.x - maxX) ? Direction.RIGHT : Direction.LEFT;
                        }
                        if (prevDominoItem.y > 3) {
                            return Math.abs(spinner.x - minX) < Math.abs(spinner.x - maxX) ? Direction.LEFT : Direction.RIGHT;
                        }
                    }
                }
            } else {
                let maxWidthAndHeight: Point = DominoCalculator.getMaxWidthAndHeight(gameMode);
                if (maxX - minX > maxWidthAndHeight.x) {
                    if (Math.abs(prevDominoItem.y) < .1) {
                        return prevDominoItem.x - minX > maxX - prevDominoItem.x ? Direction.LEFT : Direction.RIGHT;
                    }
                    if (prevDominoItem.y < -maxWidthAndHeight.y) {
                        if (prevDominoItem.x == maxX) {
                            return Direction.LEFT;
                        }
                        if (prevDominoItem.x == minX) {
                            return Direction.RIGHT;
                        }
                    }
                }
            }
        }
        return Direction.NONE;
    }
}