import { create } from 'zustand'
import { Tile } from './draggingPiece';

export type Piece = {
    id: number;
    type: string;
    tile: Tile;
    numberOfMoves: number;
};

export type PiecePositionsStore = {
    piecePositions: Record<number, Piece>;
    initializePositions: (positions: Record<number, Piece>) => void
    setPiecePosition: (id: number, x: number, y: number) => void;
};

export const usePiecePositions = create<PiecePositionsStore>((set) => ({
    piecePositions: {},
    initializePositions: (positions) => set(() => ({
        piecePositions: positions,
    })),
    setPiecePosition: (id, x, y) =>
        set((state) => ({
            piecePositions: {
                ...state.piecePositions,
                [id]: { id: id, type: "pawn", tile: { x, y }, numberOfMoves: (state.piecePositions[id]?.numberOfMoves ?? 0) + 1 },
            },
        })),
}));
