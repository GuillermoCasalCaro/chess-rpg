import { Text, Group, Button } from '@mantine/core';
import { useGameStatsStore } from '../../state/gameStatsStore';
import { usePiecePositionsStore } from '../../state/piecePositionsStore';

export const GameStatsSection = () => {
    const { gameStats, setGameStats } = useGameStatsStore();
    const { piecePositions } = usePiecePositionsStore();

    return (
        <Group
            px="md"
            py="sm"
            style={{
                backgroundColor: '#222',
                color: '#fff',
                borderRadius: '8px',
                fontFamily: 'Press Start 2P, sans-serif',
                display: 'flex',
                justifyContent: 'space-around',
            }}
        >
            <Text size="lg">Round: #{gameStats.numberOfRounds}</Text>
            <Text size="lg">Money: {gameStats.money} $</Text>
            <Text size="lg">Pieces: {Object.keys(piecePositions).length}</Text>
            <Text size="lg">Moves: {gameStats.leftMovesPerRound}</Text>
            <Button
                size="xs"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                onClick={() => setGameStats({ leftMovesPerRound: 3 })}
            >
                {'NEXT'}
            </Button>
        </Group>
    );
};
