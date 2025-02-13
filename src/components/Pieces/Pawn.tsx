import { Sprite } from "@pixi/react";
import whitePawn from "/white_pawn.png";
import { Tile, useDraggingPiece } from "../../state/draggingPiece";
import { usePiecePositions } from "../../state/piecePositions";
import { pruneImpossibleTiles, tileToPixel } from "./util";

interface PawnProps {
    id: string;
    position: Tile;
}

export const Pawn = (props: PawnProps) => {
    const { draggingPieceId, setDraggingPieceId, clearDraggingPiece } =
        useDraggingPiece();
    const pieceInfo = usePiecePositions().piecePositions[props.id];
    const pixelPosition = tileToPixel(props.position);

    return (
        <Sprite
            image={whitePawn}
            x={pixelPosition.x}
            y={pixelPosition.y}
            anchor={0.5}
            eventMode="dynamic"
            onclick={() => {
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
