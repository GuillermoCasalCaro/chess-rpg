import { Stage, Container, Graphics } from '@pixi/react';
import { useEffect } from 'react';
import { Piece } from './Piece';
import { usePiecePositionsStore } from '../../state/piecePositionsStore';
import { useDraggingPieceStore } from '../../state/draggingPieceStore';
import { initialPositions } from '../initialPositions';
import { Button } from '@mantine/core';

export const BOARD_SIZE = 8;
export const TILE_SIZE = 100;

interface ChessBoardProps {
    onMenuClicked: () => void;
}

export const ChessBoard = ({ onMenuClicked }: ChessBoardProps) => {
    const { piecePositions, initializePositions, setPiecePosition } =
        usePiecePositionsStore();
    const { draggingPiece: draggingPieceId, clearDraggingPiece } =
        useDraggingPieceStore();

    useEffect(() => {
        initializePositions(initialPositions);
    }, [initializePositions]);

    const isDestinationTile = (col: number, row: number) => {
        return Boolean(
            draggingPieceId?.allowedTiles.filter(
                (t) => t.x === col && t.y === row,
            ).length,
        );
    };

    const getTileColor = (col: number, row: number) => {
        const isDraggingPieceTile =
            !!draggingPieceId &&
            piecePositions[draggingPieceId.id].tile.x === col &&
            piecePositions[draggingPieceId.id].tile.y === row;
        if (isDraggingPieceTile) {
            return 'rgb(62, 219, 56)';
        }

        if (isDestinationTile(col, row)) {
            return 'rgb(255,255,0)';
        }

        const isEven = (col + row) % 2 === 0;
        if (isEven) {
            return 'rgb(249,223,189)';
        } else {
            return 'rgb(96,56,20)';
        }
    };

    return (
        <>
            <Stage
                width={BOARD_SIZE * TILE_SIZE}
                height={BOARD_SIZE * TILE_SIZE}
                options={{ backgroundColor: 0x222222 }}
            >
                <Container>
                    {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map(
                        (_, index) => {
                            const row = Math.floor(index / BOARD_SIZE);
                            const col = index % BOARD_SIZE;

                            return (
                                <Graphics
                                    key={`tile${col}${row}`}
                                    draw={(g) => {
                                        g.beginFill(getTileColor(col, row));
                                        g.drawRect(
                                            col * TILE_SIZE,
                                            row * TILE_SIZE,
                                            TILE_SIZE,
                                            TILE_SIZE,
                                        );
                                        g.endFill();
                                    }}
                                    eventMode="static"
                                    onclick={() => {
                                        if (
                                            !draggingPieceId ||
                                            !isDestinationTile(col, row)
                                        ) {
                                            return;
                                        }
                                        setPiecePosition(
                                            draggingPieceId.id,
                                            col,
                                            row,
                                        );
                                        clearDraggingPiece();
                                    }}
                                />
                            );
                        },
                    )}
                </Container>

                {Object.values(piecePositions).map((piece) => {
                    return (
                        <Piece
                            key={piece.id}
                            id={piece.id}
                            type={piece.type}
                            position={piece.tile}
                        />
                    );
                })}
            </Stage>

            <Button
                style={{ position: 'fixed', left: '20px', top: '20px' }}
                onClick={onMenuClicked}
            >
                Go to Menu
            </Button>
        </>
    );
};
