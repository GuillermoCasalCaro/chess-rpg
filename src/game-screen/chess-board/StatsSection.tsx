import { Text, Group } from '@mantine/core';
import { useGameStatsStore } from '../../state/gameStatsStore';
import { usePiecePositionsStore } from '../../state/piecePositionsStore';

export const GameStatsSection = () => {
    const { gameStats } = useGameStatsStore();
    const { piecePositions } = usePiecePositionsStore();

    return (
        <Group
            grow
            px="md"
            py="sm"
            style={{
                backgroundColor: '#222',
                color: '#fff',
                borderRadius: '8px',
                fontFamily: 'Press Start 2P, sans-serif',
            }}
        >
            <Text size="lg">Round: #{gameStats.numberOfRounds}</Text>
            <Text size="lg">Money: {gameStats.money} $</Text>
            <Text size="lg">Pieces: {Object.keys(piecePositions).length}</Text>
        </Group>
    );
};
