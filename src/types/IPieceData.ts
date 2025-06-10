
import {DominoNumber} from "./DominoNumber";
import {IPieceJointData} from "./IPieceJointData";
import {PiecePlace} from "./PiecePlace";
import {SitPlace} from "./SitPlace";


export type IPieceData = {
    pivot: boolean;
    values: [DominoNumber, DominoNumber],
    joker: boolean,
    shown: boolean,
    open: boolean,
    place: PiecePlace,
    side: SitPlace,
    order: number,
    joint: IPieceJointData,
    pos: [number, number],
    rot: PieceRot,
    unusedIdx: number,
    score: number,
}

export enum PieceRot {
    UP = "up",
    RIGHT = "right",
    DOWN = "down",
    LEFT = "left",
    NONE = "",
}