import { Sprite } from "@pixi/react";
import { TILE_SIZE } from "./ChessBoard";
import { Tile, useDraggingPiece } from "../state/draggingPiece";
import { usePiecePositions } from "../state/piecePositions";
import whitePawn from "/white_pawn.png"
import '@pixi/events';

interface PieceProps {
    id: number,
    type: 'pawn',
    position: Tile
}

const calculateTile = (pos: Tile) => {
    return { x: pos.x * TILE_SIZE + TILE_SIZE / 2, y: pos.y * TILE_SIZE + TILE_SIZE / 2 }
}

export const Piece = (props: PieceProps) => {
    const { draggingPieceId, setDraggingPieceId, clearDraggingPiece } = useDraggingPiece();
    const pieceInfo = usePiecePositions().piecePositions[props.id];
    const position = calculateTile(props.position);

    return <Sprite
        image={whitePawn}
        x={position.x}
        y={position.y}
        anchor={0.5}
        eventMode="dynamic"
        onclick={() => {
            console.log("e")
            if (draggingPieceId?.id === props.id) {
                clearDraggingPiece();
            } else {
                const allowedtiles = [{ x: props.position.x, y: props.position.y - 1 }];
                if (pieceInfo.numberOfMoves === 0) {
                    allowedtiles.push({ x: props.position.x, y: props.position.y - 2 })
                }
                setDraggingPieceId(props.id, allowedtiles);
            }
        }}
    />
}