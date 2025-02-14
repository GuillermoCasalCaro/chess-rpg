import { Sprite } from '@pixi/react';
import whitePawn from '/w_rook.png';
import { useDraggingPieceStore } from '../../../state/draggingPieceStore';
import { isTileOccupied, pruneOutboundTiles, tileToPixel } from './util';
import { BOARD_SIZE } from '../ChessBoard';
import { usePiecePositionsStore } from '../../../state/piecePositionsStore';
import { Tile } from './types';

interface RookProps {
    id: string;
    position: Tile;
    height: number;
    width: number;
}

export const WhiteRook = ({ id, position, height, width }: RookProps) => {
    const {
        draggingPiece: draggingPieceId,
        setDraggingPiece: setDraggingPieceId,
        clearDraggingPiece,
    } = useDraggingPieceStore();
    const { piecePositions } = usePiecePositionsStore();
    const pixelPosition = tileToPixel(position);

    const paintAllowedPositions = () => {
        let allowedTiles: Tile[] = [];

        for (let i = position.y + 1; i < BOARD_SIZE; i++) {
            const tile = { x: position.x, y: i };
            if (isTileOccupied(tile, piecePositions)) break;
            allowedTiles.push(tile);
        }
        for (let i = position.y - 1; i >= 0; i--) {
            const tile = { x: position.x, y: i };
            if (isTileOccupied(tile, piecePositions)) break;
            allowedTiles.push(tile);
        }
        for (let i = position.x + 1; i < BOARD_SIZE; i++) {
            const tile = { x: i, y: position.y };
            if (isTileOccupied(tile, piecePositions)) break;
            allowedTiles.push(tile);
        }
        for (let i = position.x - 1; i >= 0; i--) {
            const tile = { x: i, y: position.y };
            if (isTileOccupied(tile, piecePositions)) break;
            allowedTiles.push(tile);
        }
        allowedTiles = pruneOutboundTiles(allowedTiles);
        setDraggingPieceId(id, allowedTiles, []);
    };

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
                    paintAllowedPositions();
                }
            }}
        />
    );
};
