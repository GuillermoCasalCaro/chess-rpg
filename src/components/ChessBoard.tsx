import { Stage, Container, Graphics } from "@pixi/react";
import { useEffect } from "react";
import { Piece } from "./Piece";
import { usePiecePositions, Piece as PieceType } from "../state/piecePositions";
import { useDraggingPiece } from "../state/draggingPiece";

export const BOARD_SIZE = 8;
export const TILE_SIZE = 100;

export const ChessBoard = () => {
    const { piecePositions, initializePositions, setPiecePosition } =
        usePiecePositions();
    const { draggingPieceId, clearDraggingPiece } = useDraggingPiece();

    useEffect(() => {
        const initialPositions = Array.from({ length: 8 }).reduce(
            (acc: Record<number, PieceType>, _, i) => {
                acc[i] = {
                    id: i,
                    type: "pawn",
                    tile: { x: i, y: 6 },
                    numberOfMoves: 0,
                };
                return acc;
            },
            {}
        );
        initializePositions(initialPositions);
    }, [initializePositions]);

    return (
        <Stage
            width={BOARD_SIZE * TILE_SIZE}
            height={BOARD_SIZE * TILE_SIZE}
            options={{ backgroundColor: 0x222222 }}>
            <Container>
                {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map(
                    (_, index) => {
                        const row = Math.floor(index / BOARD_SIZE);
                        const col = index % BOARD_SIZE;
                        const isDestination =
                            draggingPieceId?.allowedTiles.filter(
                                (t) => t.x === col && t.y === row
                            ).length;
                        let color =
                            (row + col) % 2 === 0
                                ? "rgb(249,223,189)"
                                : "rgb(96,56,20)";
                        if (isDestination) {
                            color = "rgb(255,255,0)";
                        }
                        return (
                            <Graphics
                                key={`tile${col}${row}`}
                                draw={(g) => {
                                    g.beginFill(color);
                                    g.drawRect(
                                        col * TILE_SIZE,
                                        row * TILE_SIZE,
                                        TILE_SIZE,
                                        TILE_SIZE
                                    );
                                    g.endFill();
                                }}
                                eventMode="static"
                                onclick={() => {
                                    console.log("cl");
                                    if (!draggingPieceId || !isDestination) {
                                        return;
                                    }
                                    setPiecePosition(
                                        draggingPieceId.id,
                                        col,
                                        row
                                    );
                                    clearDraggingPiece();
                                }}
                            />
                        );
                    }
                )}
            </Container>

            {Object.values(piecePositions).map((piece) => {
                return (
                    <Piece
                        key={piece.id}
                        id={piece.id}
                        type={"pawn"}
                        position={piece.tile}
                    />
                );
            })}
        </Stage>
    );
};
