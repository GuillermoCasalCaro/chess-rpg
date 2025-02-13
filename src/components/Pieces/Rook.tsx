import { Sprite } from "@pixi/react";
import whitePawn from "/w_rook.png";
import { Tile, useDraggingPiece } from "../../state/draggingPiece";
import { pruneImpossibleTiles, tileToPixel } from "./util";
import { BOARD_SIZE } from "../ChessBoard";
import { usePiecePositions } from "../../state/piecePositions";

interface RookProps {
    id: string;
    position: Tile;
    height: number;
    width: number;
}

export const Rook = ({ id, position, height, width }: RookProps) => {
    const { draggingPieceId, setDraggingPieceId, clearDraggingPiece } =
        useDraggingPiece();
    const { piecePositions } = usePiecePositions();
    const pixelPosition = tileToPixel(position);

    return (
        <Sprite
            image={whitePawn}
            x={pixelPosition.x}
            y={pixelPosition.y}
            height={height}
            width={width}
            anchor={0.5}
            eventMode="dynamic"
            onclick={() => {
                if (draggingPieceId?.id === id) {
                    clearDraggingPiece();
                } else {
                    let allowedTiles: Tile[] = [];
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
                    allowedTiles = pruneImpossibleTiles(
                        allowedTiles,
                        piecePositions
                    );
                    setDraggingPieceId(id, allowedTiles);
                }
            }}
        />
    );
};
