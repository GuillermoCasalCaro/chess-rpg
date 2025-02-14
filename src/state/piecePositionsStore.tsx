import { create } from 'zustand';
import { Tile } from './draggingPieceStore';
import { PieceType } from '../game-screen/chess-board/Pieces/types';
import { getInitialPositions } from '../game-screen/initialPositions';

export type Piece = {
    id: string;
    type: PieceType;
    tile: Tile;
    numberOfMoves: number;
};

export type PiecePositionsStore = {
    piecePositions: Record<string, Piece>;
    initializePositions: () => void;
    setPiecePosition: (id: string, x: number, y: number) => void;
    resetPiecePositions: () => void;
};

export const usePiecePositionsStore = create<PiecePositionsStore>((set) => ({
    piecePositions: {},
    initializePositions: () =>
        set(() => ({
            piecePositions: getInitialPositions(),
        })),
    setPiecePosition: (id, x, y) =>
        set((state) => {
            const piece = state.piecePositions[id];
            return {
                piecePositions: {
                    ...state.piecePositions,
                    [id]: {
                        ...piece,
                        tile: { x, y },
                        numberOfMoves: piece.numberOfMoves + 1,
                    },
                },
            };
        }),
    resetPiecePositions: () =>
        set(() => {
            return {
                piecePositions: getInitialPositions(),
            };
        }),
}));
