import { Stage, Container, Graphics } from '@pixi/react';
import { useCallback, useEffect } from 'react';
import { PieceWrapper } from './PieceWrapper';
import { usePiecePositionsStore } from '../../state/piecePositionsStore';
import { useDraggingPieceStore } from '../../state/draggingPieceStore';
import { GameStatsSection } from './StatsSection';
import { useGameStatsStore } from '../../state/gameStatsStore';
import { Tile } from './Pieces/types';
import { getPieceValue, shouldLevelUp } from './Pieces/util';
import { GameState, useGameStateStore } from '../../state/gameStateStore';

export const BOARD_SIZE = 8;
export const TILE_SIZE = 100;

enum TileKind {
    SELECTED,
    MOVABLE,
    EDIBLE,
    DEFAULT_EVEN,
    DEFAULT_ODD,
}

const TILE_COLORS = {
    [TileKind.SELECTED]: 'rgb(45, 189, 40)',
    [TileKind.MOVABLE]: 'rgb(206, 206, 0)',
    [TileKind.EDIBLE]: 'rgb(119, 12, 161)',
    [TileKind.DEFAULT_EVEN]: 'rgb(249,223,189)',
    [TileKind.DEFAULT_ODD]: 'rgb(96,56,20)',
};

export const ChessBoard = () => {
    const {
        piecePositions,
        initializePositions,
        setPieceData,
        deletePieceByTile,
        getPieceByTile,
    } = usePiecePositionsStore();
    const { draggingPiece, clearDraggingPiece } = useDraggingPieceStore();
    const { gameStats, decreaseLeftMovesPerRound, setGameStats } =
        useGameStatsStore();
    const { gameState } = useGameStateStore();

    useEffect(() => {
        initializePositions();
    }, [initializePositions]);

    useEffect(() => {
        console.log(gameState);
        if (gameState === GameState.MatchFinished) {
            initializePositions();
        }
    }, [initializePositions, gameState]);

    const isDestinationTile = useCallback(
        (col: number, row: number) => {
            return Boolean(
                draggingPiece?.allowedTiles.filter(
                    (t) => t.x === col && t.y === row,
                ).length,
            );
        },
        [draggingPiece?.allowedTiles],
    );

    const isEdibleTile = useCallback(
        (col: number, row: number) => {
            return Boolean(
                draggingPiece?.eatenTiles.filter(
                    (t) => t.x === col && t.y === row,
                ).length,
            );
        },
        [draggingPiece?.eatenTiles],
    );

    const getTileKind = useCallback(
        (col: number, row: number) => {
            const isDraggingPieceTile =
                !!draggingPiece &&
                piecePositions[draggingPiece.id].tile.x === col &&
                piecePositions[draggingPiece.id].tile.y === row;
            if (isDraggingPieceTile) {
                return TileKind.SELECTED;
            }

            if (gameStats.leftMovesPerRound > 0) {
                if (isDestinationTile(col, row)) {
                    return TileKind.MOVABLE;
                }
                if (isEdibleTile(col, row)) {
                    return TileKind.EDIBLE;
                }
            }

            const isEven = (col + row) % 2 === 0;
            if (isEven) {
                return TileKind.DEFAULT_EVEN;
            } else {
                return TileKind.DEFAULT_ODD;
            }
        },
        [
            draggingPiece,
            gameStats.leftMovesPerRound,
            isDestinationTile,
            isEdibleTile,
            piecePositions,
        ],
    );

    const movePieceTo = (id: string, tile: Tile, tileKind: TileKind) => {
        const pieceToMove = {
            ...piecePositions[id],
            tile,
            numberOfMoves: piecePositions[id].numberOfMoves + 1,
        };

        const killedPiece = getPieceByTile(tile);
        if (tileKind === TileKind.EDIBLE && killedPiece) {
            pieceToMove.kills = pieceToMove.kills + 1;
            setGameStats({
                money: gameStats.money + getPieceValue(killedPiece),
            });
            deletePieceByTile(tile);
            if (shouldLevelUp(pieceToMove)) {
                pieceToMove.level = pieceToMove.level + 1;
            }
        }

        setPieceData(id, pieceToMove);
        decreaseLeftMovesPerRound();
        clearDraggingPiece();
    };

    return (
        <>
            <Stage
                width={BOARD_SIZE * TILE_SIZE}
                height={BOARD_SIZE * TILE_SIZE}
                options={{ backgroundColor: 0x222222 }}
                style={{
                    border: '3px solid var(--mantine-color-gray-5)',
                    borderRadius: '5px',
                }}
            >
                <Container>
                    {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map(
                        (_, index) => {
                            const row = Math.floor(index / BOARD_SIZE);
                            const col = index % BOARD_SIZE;
                            const tileKind = getTileKind(col, row);
                            return (
                                <Graphics
                                    key={`tile${col}${row}`}
                                    draw={(g) => {
                                        g.beginFill(TILE_COLORS[tileKind]);
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
                                        if (tileKind === TileKind.MOVABLE) {
                                            movePieceTo(
                                                draggingPiece!.id,
                                                {
                                                    x: col,
                                                    y: row,
                                                },
                                                tileKind,
                                            );
                                            return;
                                        }
                                        if (tileKind === TileKind.EDIBLE) {
                                            movePieceTo(
                                                draggingPiece!.id,
                                                {
                                                    x: col,
                                                    y: row,
                                                },
                                                tileKind,
                                            );
                                        }
                                    }}
                                />
                            );
                        },
                    )}
                </Container>

                {Object.values(piecePositions).map((piece) => {
                    return <PieceWrapper key={piece.id} piece={piece} />;
                })}
            </Stage>
            <GameStatsSection />
        </>
    );
};
