import { Piece, PiecePositions, Tile } from './types';
import _ from 'lodash';
import { isTileOccupied } from './util';

export const calculateBlackMoves = (piecePositions: PiecePositions) => {
    const updatedPositions = _.cloneDeep(piecePositions);

    const blackPieceIDs = Object.values(updatedPositions)
        .filter((piece) => piece.color === 'black')
        .map((piece) => piece.id);

    blackPieceIDs.forEach((id) => {
        const piece = updatedPositions[id];
        const newTile = getNewTile(piece, updatedPositions);
        updatedPositions[id] = {
            ...piece,
            tile: newTile,
        };
    });

    return updatedPositions;
};

const getNewTile = (piece: Piece, positions: PiecePositions) => {
    switch (piece.type) {
        case 'pawn':
            return moveBlackPawn(piece, positions);
        case 'rook':
            return moveBlackRook(piece);
    }
};

const moveBlackPawn = (piece: Piece, positions: PiecePositions) => {
    const frontTile: Tile = {
        x: piece.tile.x,
        y: piece.tile.y + 1,
    };

    if (isTileOccupied(frontTile, positions)) {
        return {
            x: piece.tile.x,
            y: piece.tile.y,
        };
    }

    return frontTile;
};

const moveBlackRook = (piece: Piece) => {
    return {
        x: piece.tile.x,
        y: piece.tile.y + 1,
    };
};
