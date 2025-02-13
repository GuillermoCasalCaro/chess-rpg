import { create } from 'zustand';

export type Tile = { x: number; y: number };

export enum GameState {
    Menu,
    GameStarted,
}

type GameStateStore = {
    gameState: GameState;
    showMenu: boolean;
    setGameState: (gameState: GameState) => void;
    setShowMenu: (gameState: GameState) => void;
};

export const useGameStateStore = create<GameStateStore>()((set) => ({
    gameState: GameState.Menu,
    setGameState: (gameState) => {
        set({ gameState });
    },
}));
