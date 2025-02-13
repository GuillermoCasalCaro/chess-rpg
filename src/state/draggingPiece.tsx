import { create } from "zustand";

export type Tile = { x: number; y: number };

type DraggingPieceStore = {
    draggingPieceId: { id: string; allowedTiles: Tile[] } | null;
    setDraggingPieceId: (id: string | null, allowedTiles: Tile[]) => void;
    clearDraggingPiece: () => void;
};

export const useDraggingPiece = create<DraggingPieceStore>()((set) => ({
    draggingPieceId: null,
    setDraggingPieceId: (draggingPieceId, allowedTiles) => {
        if (draggingPieceId === null) {
            set({
                draggingPieceId: null,
            });
            return;
        }
        set({
            draggingPieceId: {
                id: draggingPieceId,
                allowedTiles: allowedTiles,
            },
        });
    },
    clearDraggingPiece: () => set({ draggingPieceId: null }),
}));
