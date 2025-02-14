import { create } from 'zustand';
import { getInitialPositions } from '../game-screen/initialPositions';
import { PiecePositions, Tile } from '../game-screen/chess-board/Pieces/types';

export type PiecePositionsStore = {
    piecePositions: PiecePositions;
    initializePositions: () => void;
    setPiecePosition: (id: string, x: number, y: number) => void;
    setPiecePositions: (piecePositions: PiecePositions) => void;
    deletePiece: (id: string) => void;
    deletePieceByTile: (tile: Tile) => void;
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
    setPiecePositions: (piecePositions) =>
        set(() => ({
            piecePositions,
        })),

    deletePiece: (id: string) => {
        set((state) => {
            const newPiecePositions = { ...state.piecePositions };
            delete newPiecePositions[id];
            return {
                piecePositions: newPiecePositions,
            };
        });
    },
    deletePieceByTile: (tile: Tile) => {
        set((state) => {
            const newPiecePositions = { ...state.piecePositions };
            Object.values(newPiecePositions).forEach((piece) => {
                if (piece.tile.x === tile.x && piece.tile.y === tile.y) {
                    delete newPiecePositions[piece.id];
                }
            });
            return {
                piecePositions: newPiecePositions,
            };
        });
    },
    resetPiecePositions: () =>
        set(() => {
            return {
                piecePositions: getInitialPositions(),
            };
        }),
}));
