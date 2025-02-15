import _ from "lodash";
import { BOARD_SIZE } from "../ChessBoard";
import { Piece, PiecePositions } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const generatePieces = (piecePositions: PiecePositions) => {
    const newPieces = _.cloneDeep(piecePositions);
    const topTiles = Array.from({ length: BOARD_SIZE }).map((_, i) => i) as number[];
    const topTilesOccupied = Object.values(newPieces).filter((p) => p.tile.y === 0).map((p) => p.tile.x);
    const emptyTopTiles = topTiles.filter((t) => !topTilesOccupied.includes(t));

    if (emptyTopTiles.length > 0) {
        const randomEmptyTile = emptyTopTiles[Math.floor(Math.random() * emptyTopTiles.length)];
        const piece = {
            id: uuidv4(),
            color: 'black',
            type: 'pawn',
            tile: {x: randomEmptyTile, y: 0},
            kills: 0,
            allowedTiles: [],
            eatenTiles: [],
            numberOfMoves: 0,
            level: 1,
        } as Piece;
        newPieces[piece.id] = piece;
    }

    return newPieces;
}   