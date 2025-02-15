import { Text, Group, Button } from '@mantine/core';
import { useGameStatsStore } from '../../state/gameStatsStore';
import { usePiecePositionsStore } from '../../state/piecePositionsStore';
import { calculateBlackMoves } from './Pieces/black-moves';
import { useDraggingPieceStore } from '../../state/draggingPieceStore';
import { generatePieces } from './Pieces/black-generation';

export const GameStatsSection = () => {
    const { gameStats, setGameStats } = useGameStatsStore();
    const { piecePositions, setPiecePositions } = usePiecePositionsStore();
    const { clearDraggingPiece } = useDraggingPieceStore();

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
            <Text size="lg">
                Pieces:{' '}
                {
                    Object.values(piecePositions).filter(
                        (p) => p.color === 'white',
                    ).length
                }
            </Text>
            <Text size="lg">Moves: {gameStats.leftMovesPerRound}</Text>
            <Button
                size="xs"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                onClick={() => {
                    setGameStats({
                        leftMovesPerRound: 3,
                        numberOfRounds: gameStats.numberOfRounds + 1,
                    });
                    clearDraggingPiece();
                    const movedBlackPieces =
                        calculateBlackMoves(piecePositions);

                    let generatedBlackPieces = movedBlackPieces;
                    if (gameStats.numberOfRounds < 20) {
                        generatedBlackPieces = generatePieces(movedBlackPieces);
                    }
                    setPiecePositions(generatedBlackPieces);
                }}
            >
                {'NEXT'}
            </Button>
        </Group>
    );
};
