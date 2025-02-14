import { Stage, Text } from '@pixi/react';
import { useEffect, useMemo, useState } from 'react';
import { TextStyle } from 'pixi.js';
import { GlowFilter } from '@pixi/filter-glow';

export const ChessRPGTitle = () => {
    const [glow, setGlow] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlow((prev) => {
                const newGlow = prev + 0.1 * direction;
                if (newGlow >= 2 || newGlow <= 0) {
                    setDirection(-direction);
                }
                return newGlow;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [direction]);

    const glowFilter = useMemo(() => {
        return new GlowFilter({
            distance: 10,
            outerStrength: glow,
            color: 0xffcc00,
        });
    }, [glow]);

    return (
        <Stage width={400} height={100} options={{ backgroundAlpha: 0 }}>
            <Text
                text="Chess RPG"
                anchor={0.5}
                x={200}
                y={50}
                filters={[glowFilter]}
                style={
                    new TextStyle({
                        fontFamily: 'Arial',
                        fontSize: 48,
                        fontWeight: 'bold',
                        fill: ['rgb(255, 255, 255)', 'rgb(255, 204, 0)'],
                        stroke: 'rgb(0, 0, 0)',
                        strokeThickness: 6,
                        dropShadow: true,
                        dropShadowColor: 'rgb(0, 0, 0)',
                        dropShadowBlur: 10,
                        dropShadowDistance: 4,
                        padding: 10,
                    })
                }
            />
        </Stage>
    );
};
