import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Menu } from './menu/Menu';
import { GameScreen } from './game-screen/GameScreen';
import { GameState, useGameStateStore } from './state/gameStateStore';

function App() {
    const [showMenu, setShowMenu] = useState(false);
    const { gameState, setGameState } = useGameStateStore();

    useEffect(() => {
        const toggleMenu = (e: KeyboardEvent) => {
            if (gameState === GameState.Menu) return;
            if (e.key === 'Escape') {
                setShowMenu((showMenu) => !showMenu);
            }
        };

        window.addEventListener('keydown', toggleMenu);

        return () => {
            window.removeEventListener('keydown', toggleMenu);
        };
    }, [gameState]);

    return (
        <MantineProvider>
            {gameState === GameState.GameStarted && <GameScreen />}
            {(gameState === GameState.Menu || showMenu) && (
                <Menu
                    onContinue={() => setShowMenu(false)}
                    onStartGame={() => setGameState(GameState.GameStarted)}
                />
            )}
        </MantineProvider>
    );
}

export default App;
