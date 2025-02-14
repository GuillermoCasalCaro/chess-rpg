import { create } from 'zustand';

export type Tile = { x: number; y: number };

interface GameStats {
    numberOfRounds: number;
    money: number;
}

type GameStatsStore = {
    gameStats: GameStats;
    setGameStats: (gameStats: GameStats) => void;
    resetGameStats: () => void;
};

const initialGameStats: GameStats = {
    numberOfRounds: 0,
    money: 0,
};

export const useGameStatsStore = create<GameStatsStore>()((set) => ({
    gameStats: initialGameStats,
    setGameStats: (gameStats) => {
        set({ gameStats });
    },
    resetGameStats: () => {
        set({ gameStats: initialGameStats });
    },
}));
