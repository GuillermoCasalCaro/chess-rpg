import { Button, Container } from '@mantine/core';
import { GameState, useGameStateStore } from '../state/gameStateStore';
import { initialPositions } from '../game-screen/initialPositions';
import { usePiecePositionsStore } from '../state/piecePositionsStore';
import { useDraggingPieceStore } from '../state/draggingPieceStore';
import { ChessRPGTitle } from './ChessRPGTitle';

interface MenuProps {
    onStartGame: () => void;
    onContinue: () => void;
}

export const Menu = ({ onStartGame, onContinue }: MenuProps) => {
    const { gameState } = useGameStateStore();
    const { initializePositions } = usePiecePositionsStore();
    const { clearDraggingPiece } = useDraggingPieceStore();

    return (
        <div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                background: 'rgb(100, 110, 115, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container
                bg="var(--mantine-color-gray-0)"
                style={{
                    padding: '20px',
                    border: '1px solid var(--mantine-color-gray-4)',
                    borderRadius: '10px',
                    width: '400px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '10px',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <ChessRPGTitle />
                    {gameState === GameState.Menu && (
                        <Button
                            size="lg"
                            style={{ width: '200px' }}
                            onClick={onStartGame}
                        >
                            Start
                        </Button>
                    )}
                    {gameState === GameState.GameStarted && (
                        <>
                            <Button
                                size="lg"
                                style={{ width: '200px' }}
                                onClick={onContinue}
                            >
                                Resume
                            </Button>
                            <Button
                                size="lg"
                                style={{ width: '200px' }}
                                onClick={() => {
                                    initializePositions(initialPositions);
                                    clearDraggingPiece();
                                    onContinue();
                                }}
                            >
                                Restart
                            </Button>
                        </>
                    )}
                </div>
            </Container>
        </div>
    );
};
