import { Text, Group, Button } from '@mantine/core';
import { useGameStatsStore } from '../../state/gameStatsStore';
import { usePiecePositionsStore } from '../../state/piecePositionsStore';
import { calculateBlackMoves } from './Pieces/black-moves';
import { useDraggingPieceStore } from '../../state/draggingPieceStore';
import { generatePieces } from './Pieces/black-generation';
import { GameState, useGameStateStore } from '../../state/gameStateStore';

export const GameStatsSection = () => {
    const { gameStats, setGameStats } = useGameStatsStore();
    const { gameState, setGameState, finishMatch } = useGameStateStore();
    const { piecePositions, setPiecePositions, finishPositions } =
        usePiecePositionsStore();
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
            <Text size="lg">Match: #{gameStats.matchNumber}</Text>
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
            {gameState === GameState.MatchFinished && (
                <Button
                    size="xs"
                    variant="gradient"
                    gradient={{
                        from: 'rgb(8, 159, 8)',
                        to: 'rgb(0, 216, 0)',
                        deg: 90,
                    }}
                    onClick={() => {
                        setGameState(GameState.GameStarted);
                        setGameStats({
                            leftMovesPerRound: 3,
                            numberOfRounds: 1,
                        });
                        clearDraggingPiece();
                    }}
                >
                    {'START'}
                </Button>
            )}
            {gameState === GameState.GameStarted && (
                <>
                    {gameStats.numberOfRounds < 20 ? (
                        <Button
                            size="xs"
                            variant="gradient"
                            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                            onClick={() => {
                                setGameStats({
                                    leftMovesPerRound: 3,
                                    numberOfRounds:
                                        gameStats.numberOfRounds + 1,
                                });
                                setGameState(GameState.GameStarted);
                                clearDraggingPiece();
                                const movedBlackPieces =
                                    calculateBlackMoves(piecePositions);

                                let generatedBlackPieces = movedBlackPieces;
                                if (gameStats.numberOfRounds < 20) {
                                    generatedBlackPieces =
                                        generatePieces(movedBlackPieces);
                                }
                                setPiecePositions(generatedBlackPieces);
                            }}
                        >
                            {'NEXT'}
                        </Button>
                    ) : (
                        <Button
                            size="xs"
                            variant="gradient"
                            gradient={{ from: 'orange', to: 'red', deg: 90 }}
                            onClick={() => {
                                setGameStats({
                                    leftMovesPerRound: 3,
                                    numberOfRounds: 1,
                                    matchNumber: gameStats.matchNumber + 1,
                                });
                                clearDraggingPiece();
                                finishPositions();
                                finishMatch();
                                setGameState(GameState.MatchFinished);
                            }}
                        >
                            {'FINISH'}
                        </Button>
                    )}
                </>
            )}
        </Group>
    );
};
