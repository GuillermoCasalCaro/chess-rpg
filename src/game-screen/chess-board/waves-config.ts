import { PieceMark, Tile } from './Pieces/types';

export const wavesConfig: Record<
    number,
    {
        number: number;
        name: string;
        config: {
            mark: PieceMark;
            restrictions: {
                maxNumber?: number;
                allowedSpawnTiles: Tile[];
            };
        }[];
    }
> = {
    1: {
        number: 1,
        name: 'Match 1',
        config: [
            {
                mark: 'pawn',
                restrictions: {
                    maxNumber: 5,
                    allowedSpawnTiles: [{ x: 3, y: 0 }],
                },
            },
            {
                mark: 'pawn',
                restrictions: {
                    maxNumber: 5,
                    allowedSpawnTiles: [{ x: 4, y: 0 }],
                },
            },
        ],
    },
};
