import { create } from 'zustand';
import { Tile } from '../game-screen/chess-board/Pieces/types';

type DraggingPieceStore = {
    draggingPiece: {
        id: string;
        allowedTiles: Tile[];
        eatenTiles: Tile[];
    } | null;
    setDraggingPiece: (
        id: string | null,
        allowedTiles: Tile[],
        eatenTiles: Tile[],
    ) => void;
    clearDraggingPiece: () => void;
};

export const useDraggingPieceStore = create<DraggingPieceStore>()((set) => ({
    draggingPiece: null,
    setDraggingPiece: (id, allowedTiles, eatenTiles) => {
        if (id === null) {
            set({
                draggingPiece: null,
            });
            return;
        }
        set({
            draggingPiece: {
                id: id,
                allowedTiles: allowedTiles,
                eatenTiles: eatenTiles,
            },
        });
    },
    clearDraggingPiece: () => set({ draggingPiece: null }),
}));
