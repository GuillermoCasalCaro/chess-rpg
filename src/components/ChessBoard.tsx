import { Stage, Container, Graphics, Sprite } from "@pixi/react";
import { } from "pixi.js"
import { useRef, useState } from "react";
import { Piece } from "./Piece";

export const BOARD_SIZE = 8;
export const TILE_SIZE = 100;



export const ChessBoard = () => {
    const draggingRef = useRef<number>(0);
    console.log(++draggingRef.current)

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

            <Piece type="pawn" initialPosition={{ x: 0, y: 6 }} />
            <Piece type="pawn" initialPosition={{ x: 1, y: 6 }} />
            <Piece type="pawn" initialPosition={{ x: 2, y: 6 }} />
            <Piece type="pawn" initialPosition={{ x: 3, y: 6 }} />
            <Piece type="pawn" initialPosition={{ x: 4, y: 6 }} />
            <Piece type="pawn" initialPosition={{ x: 5, y: 6 }} />
            <Piece type="pawn" initialPosition={{ x: 6, y: 6 }} />
            <Piece type="pawn" initialPosition={{ x: 7, y: 6 }} />
        </Stage>
    );
};
