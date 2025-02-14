import { create } from 'zustand';
import { getInitialPositions } from '../game-screen/initialPositions';
import { Piece } from '../game-screen/chess-board/Pieces/types';

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
