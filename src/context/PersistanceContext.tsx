import { createContext, useContext, ReactNode } from 'react';
import {BoardType} from '../types/Board';
import {CurrentGame, Shot} from "../types/Game.ts";

interface PersistanceContextType {
    saveBoard: (board: BoardType) => void;
    getSavedBoard: () => BoardType;
    savePlayerScore: (username: string, score: number) => void;
    getPlayerScore: (username: string) => number;
    saveCurrentGame: (currentGame: CurrentGame | null) => void;
    getCurrentGame: () => CurrentGame|null;
    getCurrentGamePlayerScore: (player: "one" | "two") => number;
    saveLastShots: (shots: Shot[]) => void;
    getLastShots: () => Shot[] | null;
    getLastShotsOfPlayer: (player: "X" | "O") => Shot[];
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

    const savePlayerScore = (username: string, score: number) => {
        const scores = localStorage.getItem("scores");
        if (scores) {
            const scoresData = JSON.parse(scores);
            scoresData[username] = score;
            localStorage.setItem("scores", JSON.stringify(scoresData));
        } else {
            localStorage.setItem("scores", `{"${username}": ${score}}`)
        }
    }

    const getPlayerScore = (username: string): number => {
        const scores = localStorage.getItem("scores");
        if (scores) {
            const scoresData = JSON.parse(scores);
            return scoresData[username] ?? 0;
        } else {
            return 0;
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

    const getCurrentGamePlayerScore = (player: "one" | "two"): number => {
        const currentGame = localStorage.getItem("current");
        if (currentGame) {
            const currentGameData: CurrentGame = JSON.parse(currentGame);
            return player === "one" ? (currentGameData.playerOneScore ?? 0) : (currentGameData.playerTwoScore ?? 0);
        } else {
            return 0;
        }
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

    const value = {
        saveBoard,
        getSavedBoard,
        savePlayerScore,
        getPlayerScore,
        saveCurrentGame,
        getCurrentGame,
        getCurrentGamePlayerScore,
        saveLastShots,
        getLastShots,
        getLastShotsOfPlayer
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