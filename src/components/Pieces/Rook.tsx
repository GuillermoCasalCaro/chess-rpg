import { Sprite } from "@pixi/react";
import whitePawn from "/white_pawn.png";
import { Tile, useDraggingPiece } from "../../state/draggingPiece";
import { pruneImpossibleTiles, tileToPixel } from "./util";
import { BOARD_SIZE } from "../ChessBoard";

interface RookProps {
    id: string;
    position: Tile;
}

export const Rook = ({ id, position }: RookProps) => {
    const { draggingPieceId, setDraggingPieceId, clearDraggingPiece } =
        useDraggingPiece();
    const pixelPosition = tileToPixel(position);

    return (
        <Sprite
            image={whitePawn}
            x={pixelPosition.x}
            y={pixelPosition.y}
            anchor={0.5}
            eventMode="dynamic"
            onclick={() => {
                if (draggingPieceId?.id === id) {
                    clearDraggingPiece();
                } else {
                    const allowedTiles: Tile[] = [];
                    for (let i = position.y + 1; i < BOARD_SIZE; i++) {
                        allowedTiles.push({ x: position.x, y: i });
                    }
                    for (let i = position.y - 1; i >= 0; i--) {
                        allowedTiles.push({ x: position.x, y: i });
                    }
                    for (let i = position.x + 1; i < BOARD_SIZE; i++) {
                        allowedTiles.push({ x: i, y: position.y });
                    }
                    for (let i = position.x - 1; i >= 0; i--) {
                        allowedTiles.push({ x: i, y: position.y });
                    }
                    pruneImpossibleTiles(allowedTiles);
                    setDraggingPieceId(id, allowedTiles);
                }
            }}
        />
    );
};
