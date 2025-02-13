import { Sprite } from '@pixi/react';
import whitePawn from '/w_rook.png';
import { Tile, useDraggingPieceStore } from '../../../state/draggingPieceStore';
import { pruneImpossibleTiles, tileToPixel } from './util';
import { BOARD_SIZE } from '../ChessBoard';
import { usePiecePositionsStore } from '../../../state/piecePositionsStore';

interface RookProps {
    id: string;
    position: Tile;
    height: number;
    width: number;
}

export const Rook = ({ id, position, height, width }: RookProps) => {
    const {
        draggingPiece: draggingPieceId,
        setDraggingPiece: setDraggingPieceId,
        clearDraggingPiece,
    } = useDraggingPieceStore();
    const { piecePositions } = usePiecePositionsStore();
    const pixelPosition = tileToPixel(position);

    return (
        <Sprite
            image={whitePawn}
            x={pixelPosition.x}
            y={pixelPosition.y}
            height={height}
            width={width}
            anchor={0.5}
            eventMode="dynamic"
            onclick={() => {
                if (draggingPieceId?.id === id) {
                    clearDraggingPiece();
                } else {
                    let allowedTiles: Tile[] = [];
                    for (let i = position.y + 1; i < BOARD_SIZE; i++) {
                        allowedTiles.push({ x: position.x, y: i });
                    }
                    for (let i = position.y - 1; i >= 0; i--) {
                        allowedTiles.push({ x: position.x, y: i });
                    }
                    for (let i = position.x + 1; i < BOARD_SIZE; i++) {
                        allowedTiles.push({ x: i, y: position.y });
                    }
                    for (let i = position.x - 1; i >= 0; i--) {
                        allowedTiles.push({ x: i, y: position.y });
                    }
                    allowedTiles = pruneImpossibleTiles(
                        allowedTiles,
                        piecePositions,
                    );
                    setDraggingPieceId(id, allowedTiles);
                }
            }}
        />
    );
};
