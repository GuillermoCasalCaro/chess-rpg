import { Sprite } from "@pixi/react";
import { useState } from "react";
import { TILE_SIZE } from "./ChessBoard";

interface PieceProps {
    type: 'pawn',
    initialPosition: Position
}

interface Position { x: number, y: number }

export const Piece = (props: PieceProps) => {
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState<Position>(props.initialPosition)

    return <Sprite
        image={"/src/assets/white_pawn.png"}
        x={dragging ? position.x : position.x}
        y={dragging ? position.y : position.y}
        anchor={0.5}
        interactive
        pointerdown={() => {
            setDragging(true);
            console.log("pointerdown")
        }}
        pointerup={() => {
            setDragging(false);
            console.log("pointerup")
        }}
        pointerupoutside={() => {
            // setDragging(false);
            console.log("pointerupoutside")
        }}
        pointermove={(event) => {
            if (dragging) {
                console.log(event.data.global)
                const newPos = event.data.global;
                setPosition({ x: newPos.x, y: newPos.y })
            }
        }}
    />
}