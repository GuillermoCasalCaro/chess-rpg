import { create } from 'zustand';

export type Tile = { x: number; y: number };

export enum GameState {
    Menu,
    GameStarted,
}

type GameStateStore = {
    gameState: GameState;
    setGameState: (gameState: GameState) => void;
    showMenu: boolean;
    setShowMenu: (showMenu: boolean) => void;
    toggleMenu: () => void;
};

export const useGameStateStore = create<GameStateStore>()((set) => ({
    gameState: GameState.Menu,
    setGameState: (gameState) => {
        set({ gameState });
    },
    showMenu: false,
    setShowMenu: (showMenu) => {
        set({ showMenu });
    },
    toggleMenu: () => {
        set((state) => ({
            showMenu: !state.showMenu,
        }));
    },
}));
