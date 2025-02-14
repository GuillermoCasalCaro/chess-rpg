import { Sprite } from '@pixi/react';
import whitePawn from '/w_pawn.png';
import { Tile, useDraggingPieceStore } from '../../../state/draggingPieceStore';
import { usePiecePositionsStore } from '../../../state/piecePositionsStore';
import { isTileOccupied, pruneOutboundTiles, tileToPixel } from './util';

interface PawnProps {
    id: string;
    position: Tile;
    height: number;
    width: number;
}

export const Pawn = ({ position, id, height, width }: PawnProps) => {
    const {
        draggingPiece: draggingPieceId,
        setDraggingPiece: setDraggingPieceId,
        clearDraggingPiece,
    } = useDraggingPieceStore();
    const { piecePositions } = usePiecePositionsStore();
    const pieceInfo = piecePositions[id];
    const pixelPosition = tileToPixel(position);

    const getAllowedTiles = () => {
        const allowedTiles = [];
        const firstFrontTile = { x: position.x, y: position.y - 1 };
        if (isTileOccupied(firstFrontTile, piecePositions)) {
            return [];
        } else {
            allowedTiles.push(firstFrontTile);
        }

        if (pieceInfo.numberOfMoves === 0) {
            const secondFrontTile = {
                x: position.x,
                y: position.y - 2,
            };
            if (!isTileOccupied(secondFrontTile, piecePositions)) {
                allowedTiles.push(secondFrontTile);
            }
        }

        return allowedTiles;
    };

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
                    let allowedTiles = getAllowedTiles();
                    allowedTiles = pruneOutboundTiles(allowedTiles);
                    setDraggingPieceId(id, allowedTiles);
                }
            }}
        />
    );
};
