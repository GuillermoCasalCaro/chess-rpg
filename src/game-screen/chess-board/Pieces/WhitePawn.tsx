import { Sprite, Text } from '@pixi/react';
import whitePawn from '/w_pawn.png';
import whiteBronzePawn from '/w_pawn_bronze.png';
import { useDraggingPieceStore } from '../../../state/draggingPieceStore';
import { usePiecePositionsStore } from '../../../state/piecePositionsStore';
import { isTileOccupied, pruneOutboundTiles, tileToPixel } from './util';
import { Tile } from './types';
import { TextStyle } from 'pixi.js';

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
        if (!isTileOccupied(firstFrontTile, piecePositions)) {
            allowedTiles.push(firstFrontTile);

            if (pieceInfo.numberOfMoves === 0) {
                const secondFrontTile = {
                    x: position.x,
                    y: position.y - 2,
                };
                if (!isTileOccupied(secondFrontTile, piecePositions)) {
                    allowedTiles.push(secondFrontTile);
                }
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

        const backTile: Tile = {
            x: position.x,
            y: position.y + 1,
        };
        if (
            pieceInfo.level === 2 &&
            !isTileOccupied(backTile, piecePositions)
        ) {
            allowedTiles.push(backTile);
        }

        return { allowedTiles, eatenTiles };
    };

    const getTexture = () => {
        switch (pieceInfo.level) {
            case 1:
                return whitePawn;
            case 2:
                return whiteBronzePawn;
        }
    };

    return (
        <>
            <Sprite
                image={getTexture()}
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
            <Text
                text={String(piecePositions[id].kills)}
                anchor={0.5}
                x={pixelPosition.x}
                y={pixelPosition.y}
                style={
                    new TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 12,
                        fontWeight: 'bold',
                    })
                }
            />
        </>
    );
};
