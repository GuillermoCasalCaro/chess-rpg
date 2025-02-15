import { Piece, PiecePositions, Tile } from './types';
import _ from 'lodash';
import { isTileOccupied, isTileOccupiedAnd } from './util';

export const calculateBlackMoves = (piecePositions: PiecePositions) => {
    const updatedPositions = _.cloneDeep(piecePositions);

    const blackPieceIDs = Object.values(updatedPositions)
        .filter((piece) => piece.color === 'black')
        .map((piece) => piece.id);

    blackPieceIDs.forEach((id) => {
        const piece = updatedPositions[id];
        setNewTile(piece, updatedPositions);
    });

    return updatedPositions;
};

const setNewTile = (piece: Piece, positions: PiecePositions) => {
    switch (piece.type) {
        case 'pawn':
            return moveBlackPawn(piece, positions);
    }
};

const moveBlackPawn = (piece: Piece, positions: PiecePositions) => {
    const isWhite = (p: Piece) => p.color === 'white';
    const leftDiagonalPiece = isTileOccupiedAnd(
        {
            x: piece.tile.x - 1,
            y: piece.tile.y + 1,
        },
        positions,
        isWhite,
    );
    const rightDiagonalPiece = isTileOccupiedAnd(
        {
            x: piece.tile.x + 1,
            y: piece.tile.y + 1,
        },
        positions,
        isWhite,
    );
    const frontTile: Tile = {
        x: piece.tile.x,
        y: piece.tile.y + 1,
    };

    if (leftDiagonalPiece && rightDiagonalPiece) {
        const random = Math.random();
        if (random < 0.5) {
            deletePiece(leftDiagonalPiece, positions);
            positions[piece.id] = {
                ...piece,
                tile: leftDiagonalPiece.tile,
            };
            return;
        }

        deletePiece(rightDiagonalPiece, positions);
        positions[piece.id] = {
            ...piece,
            tile: rightDiagonalPiece.tile,
        };
        return;
    }

    if (leftDiagonalPiece || rightDiagonalPiece) {
        const pieceToDelete = leftDiagonalPiece ?? rightDiagonalPiece!;
        deletePiece(pieceToDelete, positions);
        positions[piece.id] = {
            ...piece,
            tile: pieceToDelete.tile,
        };
        return;
    }

    if (isTileOccupied(frontTile, positions)) {
        return;
    }

    positions[piece.id] = {
        ...piece,
        tile: frontTile,
    };
};

const deletePiece = (piece: Piece, positions: PiecePositions) => {
    delete positions[piece.id];
};
