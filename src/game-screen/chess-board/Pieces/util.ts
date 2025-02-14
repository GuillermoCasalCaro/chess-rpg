import { Tile } from '../../../state/draggingPieceStore';
import { PiecePositionsStore } from '../../../state/piecePositionsStore';
import { BOARD_SIZE, TILE_SIZE } from '../ChessBoard';

export const tileToPixel = (pos: Tile) => {
    return {
        x: pos.x * TILE_SIZE + TILE_SIZE / 2,
        y: pos.y * TILE_SIZE + TILE_SIZE / 2,
    };
};

export const pruneOutboundTiles = (allowedTiles: Tile[]) => {
    const newAllowedTiles = allowedTiles.filter(({ x, y }) => {
        return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
    });

    return newAllowedTiles;
};

export const isTileOccupied = (
    tile: Tile,
    piecePositions: PiecePositionsStore['piecePositions'],
) => {
    return Object.values(piecePositions).some(
        (p) => p.tile.x === tile.x && p.tile.y === tile.y,
    );
};
