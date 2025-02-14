import { v4 as uuidv4 } from 'uuid';
import { Piece } from '../state/piecePositionsStore';
import { PieceType } from './chess-board/Pieces/types';

export const initialPositions: Record<string, Piece> = [
    {
        type: 'pawn',
        tile: { x: 3, y: 6 },
    },
    {
        type: 'pawn',
        tile: { x: 4, y: 6 },
    },
].reduce((acc: Record<string, Piece>, piece) => {
    const id = uuidv4();
    acc[id] = {
        ...piece,
        type: piece.type as PieceType,
        id,
        numberOfMoves: 0,
    };
    return acc;
}, {});
