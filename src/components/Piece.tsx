import { Sprite } from "@pixi/react";
import { BOARD_SIZE, TILE_SIZE } from "./ChessBoard";
import { Tile, useDraggingPiece } from "../state/draggingPiece";
import { usePiecePositions } from "../state/piecePositions";
import whitePawn from "/white_pawn.png";
import "@pixi/events";

interface PieceProps {
    id: number;
    type: "pawn";
    position: Tile;
}

const calculateTile = (pos: Tile) => {
    return {
        x: pos.x * TILE_SIZE + TILE_SIZE / 2,
        y: pos.y * TILE_SIZE + TILE_SIZE / 2,
    };
};

function pruneImpossibleTiles(allowedTiles: { x: number; y: number }[]) {
    const newAllowedTiles = allowedTiles.filter(({ x, y }) => {
        return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
    });
    if (newAllowedTiles.length !== allowedTiles.length) {
        pruneImpossibleTiles(newAllowedTiles);
    }
    return newAllowedTiles;
}

export const Piece = (props: PieceProps) => {
    const { draggingPieceId, setDraggingPieceId, clearDraggingPiece } =
        useDraggingPiece();
    const pieceInfo = usePiecePositions().piecePositions[props.id];
    const position = calculateTile(props.position);

    return (
        <Sprite
            image={whitePawn}
            x={position.x}
            y={position.y}
            anchor={0.5}
            eventMode="dynamic"
            onclick={() => {
                console.log("e");
                if (draggingPieceId?.id === props.id) {
                    clearDraggingPiece();
                } else {
                    const allowedTiles = [
                        { x: props.position.x, y: props.position.y - 1 },
                    ];
                    if (pieceInfo.numberOfMoves === 0) {
                        allowedTiles.push({
                            x: props.position.x,
                            y: props.position.y - 2,
                        });
                    }
                    pruneImpossibleTiles(allowedTiles);
                    setDraggingPieceId(props.id, allowedTiles);
                }
            }}
        />
    );
};
