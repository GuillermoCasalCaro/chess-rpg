import { Sprite } from '@pixi/react';
import whitePawn from '/w_pawn.png';
import { Tile, useDraggingPiece } from '../../state/draggingPiece';
import { usePiecePositions } from '../../state/piecePositions';
import { pruneImpossibleTiles, tileToPixel } from './util';

interface PawnProps {
    id: string;
    position: Tile;
    height: number;
    width: number;
}

export const Pawn = ({ position, id, height, width }: PawnProps) => {
    const { draggingPieceId, setDraggingPieceId, clearDraggingPiece } =
        useDraggingPiece();
    const { piecePositions } = usePiecePositions();
    const pieceInfo = piecePositions[id];
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
                    let allowedTiles = [{ x: position.x, y: position.y - 1 }];
                    if (pieceInfo.numberOfMoves === 0) {
                        allowedTiles.push({
                            x: position.x,
                            y: position.y - 2,
                        });
                    }
                    allowedTiles = pruneImpossibleTiles(
                        allowedTiles,
                        piecePositions,
                    );
                    setDraggingPieceId(id, allowedTiles);
                }
            }}
        />
    );
};
