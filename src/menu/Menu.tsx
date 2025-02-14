import { Button, Container } from '@mantine/core';
import { GameState, useGameStateStore } from '../state/gameStateStore';

interface MenuProps {
    onStartGame: () => void;
    onContinue: () => void;
}

export const Menu = ({ onStartGame, onContinue }: MenuProps) => {
    const { gameState } = useGameStateStore();

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
                {gameState === GameState.Menu && (
                    <Button onClick={onStartGame}>Start</Button>
                )}
                {gameState === GameState.GameStarted && (
                    <Button onClick={onContinue}>Resume</Button>
                )}
            </Container>
        </div>
    );
};
