import { PiecePositionsStore } from '../../../state/piecePositionsStore';
import { BOARD_SIZE, TILE_SIZE } from '../ChessBoard';
import { Piece, Tile } from './types';

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
    const piece = Object.values(piecePositions).find(
        (p) => p.tile.x === tile.x && p.tile.y === tile.y,
    );
    return piece;
};

export const isTileOccupiedAnd = (
    tile: Tile,
    piecePositions: PiecePositionsStore['piecePositions'],
    check: (piece:Piece) => boolean,
) => {
    const piece = Object.values(piecePositions).find(
        (p) => p.tile.x === tile.x && p.tile.y === tile.y && check(p),
    );
    return piece;
};

export const getPieceValue = (piece: Piece) => {
    switch (piece.type) {
        case 'pawn':
            return 1;
        case 'rook':
            return 5;
    } 
};

export const shouldLevelUp = (piece: Piece) => {
    switch (piece.type) {
        case 'pawn':
            return piece.kills >= 3 && piece.level <= 1;
        case 'rook':
            return piece.kills >= 5 && piece.level <= 1;
    }
};