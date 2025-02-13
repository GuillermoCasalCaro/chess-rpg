import { Tile } from "../state/draggingPiece";
import "@pixi/events";
import { Pawn } from "./Pieces/Pawn";
import { Rook } from "./Pieces/Rook";
import { PieceType } from "./Pieces/types";

interface PieceProps {
    id: string;
    type: PieceType;
    position: Tile;
}

const PIECE_SIZE = 100;

export const Piece = (props: PieceProps) => {
    if (props.type === "pawn") {
        return (
            <Pawn
                id={props.id}
                position={props.position}
                height={PIECE_SIZE}
                width={PIECE_SIZE}
            />
        );
    }
    if (props.type === "rook") {
        return (
            <Rook
                id={props.id}
                position={props.position}
                height={PIECE_SIZE}
                width={PIECE_SIZE}
            />
        );
    }
    return <></>;
};
