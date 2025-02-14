import { Sprite } from '@pixi/react';
import whitePawn from '/b_pawn.png';
import { tileToPixel } from './util';
import { Tile } from './types';

interface PawnProps {
    id: string;
    position: Tile;
    height: number;
    width: number;
}

export const BlackPawn = ({ position, height, width }: PawnProps) => {
    const pixelPosition = tileToPixel(position);

    return (
        <Sprite
            image={whitePawn}
            x={pixelPosition.x}
            y={pixelPosition.y}
            height={height}
            width={width}
            anchor={0.5}
            eventMode="static"
        />
    );
};
