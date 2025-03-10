import { v4 as uuidv4 } from 'uuid';
import { Piece, PiecePositions } from './chess-board/Pieces/types';

export const getInitialPositions: () => PiecePositions = () =>
    (
        [
            {
                type: 'pawn',
                tile: { x: 3, y: 6 },
                color: 'white',
            },
            {
                type: 'pawn',
                tile: { x: 4, y: 6 },
                color: 'white',
            },
        ] as Piece[]
    ).reduce((acc: PiecePositions, piece) => {
        const id = uuidv4();
        acc[id] = {
            ...piece,
            id,
            numberOfMoves: 0,
            kills: 0,
            level: 1,
        };
        return acc;
    }, {});
