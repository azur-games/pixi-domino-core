
import {DominoNumber} from "./DominoNumber";
import {PieceRot} from "./IPieceData";


export type IPieceJointData = {
    piece: [DominoNumber, DominoNumber],
    additional: boolean,
    value: DominoNumber,
    joinValue: DominoNumber,
    dir: PieceRot
}