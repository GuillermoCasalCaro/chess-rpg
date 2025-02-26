import _ from 'lodash';
import { Piece, PiecePositions } from './types';
import { v4 as uuidv4 } from 'uuid';
import { wavesConfig } from '../waves-config';

export const generatePieces = (
    piecePositions: PiecePositions,
    waveNumber: number,
) => {
    const newPieces = _.cloneDeep(piecePositions);
    const occupiedTiles = Object.values(newPieces).map((p) => p.tile);

    const allowedSpawns = wavesConfig[waveNumber].config.flatMap(
        ({ mark, restrictions }) =>
            restrictions.allowedSpawnTiles.map((tile) => ({ mark, tile })),
    );

    const spawnTiles = allowedSpawns.filter(
        (spawn) => !_.some(occupiedTiles, spawn.tile),
    );

    if (spawnTiles.length > 0) {
        const randomSpawn =
            spawnTiles[Math.floor(Math.random() * spawnTiles.length)];

        const piece = {
            id: uuidv4(),
            color: 'black',
            type: randomSpawn.mark,
            tile: randomSpawn.tile,
            kills: 0,
            allowedTiles: [],
            eatenTiles: [],
            numberOfMoves: 0,
            level: 1,
        } as Piece;
        newPieces[piece.id] = piece;
    }

    return newPieces;
};
