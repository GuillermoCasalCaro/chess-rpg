import { v4 as uuidv4 } from "uuid";
import { Piece } from "../state/piecePositions";
import { PieceType } from "./Pieces/types";

export const initialPositions: Record<string, Piece> = [
    {
        type: "pawn",
        tile: { x: 0, y: 6 },
    },
    {
        type: "pawn",
        tile: { x: 1, y: 6 },
    },
    {
        type: "pawn",
        tile: { x: 2, y: 6 },
    },
    {
        type: "pawn",
        tile: { x: 3, y: 6 },
    },
    {
        type: "pawn",
        tile: { x: 4, y: 6 },
    },
    {
        type: "pawn",
        tile: { x: 5, y: 6 },
    },
    {
        type: "pawn",
        tile: { x: 6, y: 6 },
    },
    {
        type: "pawn",
        tile: { x: 7, y: 6 },
    },
    {
        type: "rook",
        tile: { x: 0, y: 7 },
    },
    {
        type: "rook",
        tile: { x: 7, y: 7 },
    },
].reduce((acc: Record<string, Piece>, piece) => {
    const id = uuidv4();
    acc[id] = {
        ...piece,
        type: piece.type as PieceType,
        id,
        numberOfMoves: 0,
    };
    return acc;
}, {});
