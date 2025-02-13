import { create } from 'zustand';

export type Tile = { x: number; y: number };

type DraggingPieceStore = {
    draggingPiece: { id: string; allowedTiles: Tile[] } | null;
    setDraggingPiece: (id: string | null, allowedTiles: Tile[]) => void;
    clearDraggingPiece: () => void;
};

export const useDraggingPieceStore = create<DraggingPieceStore>()((set) => ({
    draggingPiece: null,
    setDraggingPiece: (id, allowedTiles) => {
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
            },
        });
    },
    clearDraggingPiece: () => set({ draggingPiece: null }),
}));
