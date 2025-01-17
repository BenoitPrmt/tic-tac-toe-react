import {createContext, ReactNode, useContext} from 'react';
import {BoardType} from '../types/Board';
import {CurrentGame, Shot} from "../types/Game.ts";
import {PlayerLeaderboardType, PlayerScoreType} from "../types/Player.ts";

interface PersistanceContextType {
    saveBoard: (board: BoardType) => void;
    getSavedBoard: () => BoardType;
    savePlayerScore: (playerScore: PlayerScoreType) => void;
    saveCurrentGame: (currentGame: CurrentGame | null) => void;
    getCurrentGame: () => CurrentGame | null;
    saveCurrentPlayer: (currentPlayer: PlayerScoreType | null) => void;
    getCurrentPlayer: () => PlayerScoreType | null;
    saveLastShots: (shots: Shot[]) => void;
    getLastShots: () => Shot[] | null;
    getLastShotsOfPlayer: (player: "X" | "O") => Shot[];
    getLeaderboard: () => PlayerLeaderboardType[];
}

const PersistanceContext = createContext<PersistanceContextType | undefined>(undefined);

export const PersistanceProvider = ({ children }: { children: ReactNode }) => {
    const saveBoard = (board: BoardType) => {
        localStorage.setItem(
            'board',
            JSON.stringify(board)
        );
    }

    const getSavedBoard = (): BoardType => {
        return JSON.parse(localStorage.getItem('board') ?? "[]");
    }

    const savePlayerScore = (playerScore: PlayerScoreType) => {
        const scores = localStorage.getItem("scores");
        if (scores) {
            const scoresData: PlayerScoreType[] = JSON.parse(scores);
            scoresData.push(playerScore);
            localStorage.setItem("scores", JSON.stringify(scoresData));
        } else {
            localStorage.setItem("scores", JSON.stringify([playerScore]));
        }
    }

    const saveCurrentGame = (currentGame: CurrentGame | null) => {
        if (!currentGame) {
            localStorage.removeItem("current");
        } else {
            localStorage.setItem("current", JSON.stringify(currentGame));
        }
    }

    const getCurrentGame = (): CurrentGame|null => {
        const currentGame = localStorage.getItem("current");
        if (currentGame) {
            return JSON.parse(currentGame);
        }
        return null;
    }

    const saveCurrentPlayer = (currentPlayer: PlayerScoreType | null) => {
        if (!currentPlayer) {
            localStorage.removeItem("currentPlayer");
        } else {
            localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
        }
    }

    const getCurrentPlayer = (): PlayerScoreType | null => {
        const currentPlayer = localStorage.getItem("currentPlayer");
        if (currentPlayer) {
            return JSON.parse(currentPlayer)
        }
        return null;
    }

    const saveLastShots = (shots: Shot[]): void => {
        localStorage.setItem("lastShots", JSON.stringify(shots));
    }

    const getLastShots = (): Shot[] | null => {
        const lastShots = localStorage.getItem("lastShots");
        if (lastShots) {
            return JSON.parse(lastShots);
        }
        return null;
    }

    const getLastShotsOfPlayer = (player: "X" | "O"): Shot[] => {
        const lastShots = getLastShots();
        if (lastShots) {
            return lastShots.filter((shot: Shot) => shot.type === player);
        } else {
            return [];
        }
    }

    const getLeaderboard = (): PlayerLeaderboardType[] => {
        const scores = localStorage.getItem("scores");
        if (scores) {
            const currentPlayer: PlayerScoreType | null = getCurrentPlayer();
            const sortedData: PlayerScoreType[] = JSON.parse(scores);

            if (currentPlayer) {
                sortedData.push(currentPlayer);
            }

            const leaderboard: PlayerLeaderboardType[] = sortedData.sort((a: PlayerScoreType, b: PlayerScoreType) => b.score - a.score)
                .slice(0, 10)
                .map((item: PlayerScoreType, index: number) => ({ rank: index+1, ...item }));

            for (let i = 1; i < leaderboard.length; i++) {
                if (leaderboard[i-1].score === leaderboard[i].score) {
                    leaderboard[i].rank = leaderboard[i-1].rank
                }
            }

            return leaderboard;
        }
        return [];
    }

    const value = {
        saveBoard,
        getSavedBoard,
        savePlayerScore,
        saveCurrentGame,
        getCurrentGame,
        getCurrentPlayer,
        saveCurrentPlayer,
        saveLastShots,
        getLastShots,
        getLastShotsOfPlayer,
        getLeaderboard
    };

    return <PersistanceContext.Provider value={value}>{children}</PersistanceContext.Provider>;
};

export const usePersistance = (): PersistanceContextType => {
    const context = useContext(PersistanceContext);
    if (!context) {
        throw new Error('usePersistance must be used within a PersistanceProvider');
    }
    return context;
};