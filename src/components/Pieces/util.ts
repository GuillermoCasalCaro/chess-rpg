import { Tile } from "../../state/draggingPiece";
import { BOARD_SIZE, TILE_SIZE } from "../ChessBoard";

export const tileToPixel = (pos: Tile) => {
    return {
        x: pos.x * TILE_SIZE + TILE_SIZE / 2,
        y: pos.y * TILE_SIZE + TILE_SIZE / 2,
    };
};

export const pruneImpossibleTiles = (allowedTiles: Tile[]) => {
    const newAllowedTiles = allowedTiles.filter(({ x, y }) => {
        return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
    });
    return newAllowedTiles;
};
