import { Container, Sprite, Text } from '@pixi/react';
import whitePawn from '/w_pawn.png';
import bronzeTexturePng from '/bronze_texture.png';
import { useDraggingPieceStore } from '../../../state/draggingPieceStore';
import { usePiecePositionsStore } from '../../../state/piecePositionsStore';
import { isTileOccupied, pruneOutboundTiles, tileToPixel } from './util';
import { Tile } from './types';
import { BLEND_MODES, TextStyle, Texture } from 'pixi.js';
import { GlowFilter } from '@pixi/filter-glow';
import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
import { AdjustmentFilter } from '@pixi/filter-adjustment';

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

        return { allowedTiles, eatenTiles };
    };

    const bronzeTexture = Texture.from(bronzeTexturePng);

    // const filter = new GlowFilter({
    //     distance: 10,
    //     outerStrength: 0.5,
    //     color: 0xffcc00,
    //     innerStrength: 0.5,
    //     quality: 2,
    // });

    // const colorFilter = new ColorMatrixFilter();
    // colorFilter.hue(30, false);
    // colorFilter.saturate(1.2);
    // colorFilter.contrast(1.3, false);
    // colorFilter.brightness(1.1, false);

    // const adjustmentFilter = new AdjustmentFilter({
    //     contrast: 1.4,
    //     gamma: 1.1,
    //     saturation: 1.2,
    // });

    return (
        <>
            <Container x={pixelPosition.x} y={pixelPosition.y}>
                <Sprite
                    image={whitePawn}
                    x={pixelPosition.x}
                    y={pixelPosition.y}
                    height={height}
                    width={width}
                    anchor={0.5}
                    filters={[]}
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
                {/* <Sprite
                    texture={bronzeTexture}
                    height={height}
                    width={width}
                    anchor={0.5}
                    alpha={0.6}
                    blendMode={BLEND_MODES.MULTIPLY}
                /> */}
            </Container>
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
