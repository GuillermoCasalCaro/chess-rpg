import { v4 as uuidv4 } from 'uuid';
import { Piece } from './chess-board/Pieces/types';

export const getInitialPositions: () => Record<string, Piece> = () =>
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
            {
                type: 'pawn',
                tile: { x: 4, y: 0 },
                color: 'black',
            },
        ] as Piece[]
    ).reduce((acc: Record<string, Piece>, piece) => {
        const id = uuidv4();
        acc[id] = {
            ...piece,
            id,
            numberOfMoves: 0,
        };
        return acc;
    }, {});
