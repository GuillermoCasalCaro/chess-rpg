import { create } from 'zustand'

export type Tile = { x: number, y: number }

type DraggingPieceStore = {
    draggingPieceId: { id: number, allowedTiles: Tile[] } | null
    setDraggingPieceId: (id: number, allowedTiles: Tile[]) => void
    clearDraggingPiece: () => void
}

export const useDraggingPiece = create<DraggingPieceStore>()((set) => ({
    draggingPieceId: null,
    setDraggingPieceId: (draggingPieceId, allowedTiles) => set({ draggingPieceId: { id: draggingPieceId, allowedTiles: allowedTiles } }),
    clearDraggingPiece: () => set({ draggingPieceId: null })
}))