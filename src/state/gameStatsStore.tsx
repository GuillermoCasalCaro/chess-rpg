import { create } from 'zustand';

interface GameStats {
    numberOfRounds: number;
    money: number;
    leftMovesPerRound: number;
    matchNumber: number;
}

type GameStatsStore = {
    gameStats: GameStats;
    setGameStats: (gameStats: Partial<GameStats>) => void;
    resetGameStats: () => void;
    decreaseLeftMovesPerRound: () => void;
};

const initialGameStats: GameStats = {
    numberOfRounds: 0,
    money: 0,
    leftMovesPerRound: 3,
    matchNumber: 1,
};

export const useGameStatsStore = create<GameStatsStore>()((set) => ({
    gameStats: initialGameStats,
    setGameStats: (newGameStats) => {
        set((state) => {
            return { gameStats: { ...state.gameStats, ...newGameStats } };
        });
    },
    decreaseLeftMovesPerRound: () => {
        set((state) => {
            return {
                gameStats: {
                    ...state.gameStats,
                    leftMovesPerRound:
                        state.gameStats.leftMovesPerRound === 0
                            ? 3
                            : state.gameStats.leftMovesPerRound - 1,
                },
            };
        });
    },
    resetGameStats: () => {
        set({ gameStats: initialGameStats });
    },
}));
