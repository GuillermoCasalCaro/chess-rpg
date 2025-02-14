import { create } from 'zustand';

export type Tile = { x: number; y: number };

interface GameStats {
    numberOfRounds: number;
    money: number;
    leftMoves: number;
}

type GameStatsStore = {
    gameStats: GameStats;
    setGameStats: (gameStats: Partial<GameStats>) => void;
    resetGameStats: () => void;
};

const initialGameStats: GameStats = {
    numberOfRounds: 0,
    money: 0,
    leftMoves: 3,
};

export const useGameStatsStore = create<GameStatsStore>()((set) => ({
    gameStats: initialGameStats,
    setGameStats: (newGameStats) => {
        set((state) => {
            return { gameStats: { ...state.gameStats, ...newGameStats } };
        });
    },
    resetGameStats: () => {
        set({ gameStats: initialGameStats });
    },
}));
