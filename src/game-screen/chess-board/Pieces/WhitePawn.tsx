import { Sprite } from '@pixi/react';
import whitePawn from '/w_pawn.png';
import { useDraggingPieceStore } from '../../../state/draggingPieceStore';
import { usePiecePositionsStore } from '../../../state/piecePositionsStore';
import { isTileOccupied, pruneOutboundTiles, tileToPixel } from './util';
import { Tile } from './types';

interface PawnProps {
    id: string;
    position: Tile;
    height: number;
    width: number;
}

export const WhitePawn = ({ position, id, height, width }: PawnProps) => {
    const { draggingPiece, setDraggingPiece, clearDraggingPiece } =
        useDraggingPieceStore();
    const { piecePositions } = usePiecePositionsStore();
    const pieceInfo = piecePositions[id];
    const pixelPosition = tileToPixel(position);

    const getMoveTiles = () => {
        const allowedTiles: Tile[] = [];
        const eatenTiles: Tile[] = [];

        const firstFrontTile = { x: position.x, y: position.y - 1 };
        if (isTileOccupied(firstFrontTile, piecePositions)) {
            return { allowedTiles, eatenTiles };
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

        const leftDiagonalPiece = isTileOccupied(
            {
                x: position.x - 1,
                y: position.y - 1,
            },
            piecePositions,
        );
        const rightDiagonalPiece = isTileOccupied(
            {
                x: position.x + 1,
                y: position.y - 1,
            },
            piecePositions,
        );

        if (leftDiagonalPiece && leftDiagonalPiece.color === 'black') {
            eatenTiles.push(leftDiagonalPiece.tile);
        }
        if (rightDiagonalPiece && rightDiagonalPiece.color === 'black') {
            eatenTiles.push(rightDiagonalPiece.tile);
        }

        return { allowedTiles, eatenTiles };
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
                if (draggingPiece?.id === id) {
                    clearDraggingPiece();
                } else {
                    const moveTiles = getMoveTiles();
                    console.log(moveTiles);
                    moveTiles.allowedTiles = pruneOutboundTiles(
                        moveTiles.allowedTiles,
                    );
                    setDraggingPiece(
                        id,
                        moveTiles.allowedTiles,
                        moveTiles.eatenTiles,
                    );
                }
            }}
        />
    );
};
