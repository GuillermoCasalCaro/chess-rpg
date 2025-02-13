import { Tile } from '../../state/draggingPiece';
import { PiecePositionsStore } from '../../state/piecePositions';
import { BOARD_SIZE, TILE_SIZE } from '../ChessBoard';

export const tileToPixel = (pos: Tile) => {
    return {
        x: pos.x * TILE_SIZE + TILE_SIZE / 2,
        y: pos.y * TILE_SIZE + TILE_SIZE / 2,
    };
};

export const pruneImpossibleTiles = (
    allowedTiles: Tile[],
    piecePositions: PiecePositionsStore['piecePositions'],
) => {
    let newAllowedTiles = allowedTiles.filter(({ x, y }) => {
        return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
    });
    //filter already occupied tiles
    const pieces = Object.values(piecePositions);
    console.log(pieces.map((piece) => piece.tile));
    console.log(newAllowedTiles);
    newAllowedTiles = newAllowedTiles.filter(({ x, y }) => {
        return !pieces.some((piece) => {
            return piece.tile.x === x && piece.tile.y === y;
        });
    });

    return newAllowedTiles;
};
