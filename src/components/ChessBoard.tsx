import { Stage, Container, Graphics, Sprite } from "@pixi/react";
import { } from "pixi.js"
import { useState } from "react";
// import {} from "../assets/white_pawn.png"

const BOARD_SIZE = 8;
const TILE_SIZE = 100;

export const ChessBoard = () => {
    const [pieces, setPieces] = useState<{ x: number; y: number }[]>([
        { x: 0, y: 6 },
        { x: 1, y: 6 },
        { x: 2, y: 6 },
        { x: 3, y: 6 },
        { x: 4, y: 6 },
        { x: 5, y: 6 },
        { x: 6, y: 6 },
        { x: 7, y: 6 },
    ]);


    return (
        <Stage
            width={BOARD_SIZE * TILE_SIZE}
            height={BOARD_SIZE * TILE_SIZE}
            options={{ backgroundColor: 0x222222 }}>
            <Container>

                {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
                    const row = Math.floor(index / BOARD_SIZE);
                    const col = index % BOARD_SIZE;
                    return (
                        <Graphics
                            key={index}
                            draw={(g) => {
                                g.beginFill((row + col) % 2 === 0 ? "rgb(249,223,189)" : "rgb(96,56,20)");
                                g.drawRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                                g.endFill();
                            }}
                        />
                    );
                })}

            </Container>

            {
                pieces.map((piece, i) => (
                    <Sprite
                        key={i}
                        image={"/src/assets/white_pawn.png"}
                        x={piece.x * TILE_SIZE + TILE_SIZE / 2}
                        y={piece.y * TILE_SIZE + TILE_SIZE / 2}
                        anchor={0.5}
                        interactive

                        pointerdown={(event) => {
                            const { x, y } = event.data.global;
                            setPieces((prev) =>
                                prev.map((p, index) =>
                                    index === i ? { x: Math.floor(x / TILE_SIZE), y: Math.floor(y / TILE_SIZE) } : p
                                )
                            );
                        }}
                    />
                ))}
        </Stage>
    );
};
