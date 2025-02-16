import { create } from 'zustand';
import { Piece, Tile } from '../game-screen/chess-board/Pieces/types';

type DraggingPieceStore = {
    draggingPiece: {
        piece: Piece;
        allowedTiles: Tile[];
        eatenTiles: Tile[];
    } | null;
    setDraggingPiece: (
        piece: Piece | null,
        allowedTiles: Tile[],
        eatenTiles: Tile[],
    ) => void;
    clearDraggingPiece: () => void;
};

export const useDraggingPieceStore = create<DraggingPieceStore>()((set) => ({
    draggingPiece: null,
    setDraggingPiece: (piece, allowedTiles, eatenTiles) => {
        if (piece === null) {
            set({
                draggingPiece: null,
            });
            return;
        }
        set({
            draggingPiece: {
                piece: piece,
                allowedTiles: allowedTiles,
                eatenTiles: eatenTiles,
            },
        });
    },
    clearDraggingPiece: () => set({ draggingPiece: null }),
}));
