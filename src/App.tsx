import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { Menu } from './menu/Menu';
import { GameScreen } from './game-screen/GameScreen';
import { GameState, useGameStateStore } from './state/gameStateStore';

function App() {
    const [showMenu, setShowMenu] = useState(false);
    const { gameState, setGameState } = useGameStateStore();

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
