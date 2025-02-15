import { create } from 'zustand';

export enum GameState {
    Menu,
    GameStarted,
    MatchFinished,
}

type GameStateStore = {
    gameState: GameState;
    setGameState: (gameState: GameState) => void;
    showMenu: boolean;
    setShowMenu: (showMenu: boolean) => void;
    toggleMenu: () => void;
    finishMatch: () => void;
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
        set((state) => ({ showMenu: !state.showMenu }));
    },
    finishMatch: () => {
        set(() => ({ gameState: GameState.MatchFinished }));
    },
}));
