import { createContext, useContext, ReactNode } from 'react';
import { BoardType } from '../types/Board';
import {CurrentGame} from "../types/Game.ts";

interface PersistanceContextType {
    saveBoard: (board: BoardType) => void;
    getSavedBoard: () => BoardType;
    savePlayerScore: (username: string, score: number) => void;
    getPlayerScore: (username: string) => number;
    saveCurrentGame: (currentGame: CurrentGame) => void;
    getCurrentGame: () => CurrentGame|null;
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
        console.log(username, score)
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
            console.log(scoresData, username);
            console.log("scoresData[username] ?? 0", scoresData[username] ?? 0);
            return scoresData[username] ?? 0;
        } else {
            return 0;
        }
    }

    const saveCurrentGame = (currentGame: CurrentGame) => {
        localStorage.setItem("current", JSON.stringify(currentGame));
    }

    const getCurrentGame = (): CurrentGame|null => {
        const currentGame = localStorage.getItem("current");
        if (currentGame) {
            return JSON.parse(currentGame);
        }
        return null;
    }

    const value = {
        saveBoard,
        getSavedBoard,
        savePlayerScore,
        getPlayerScore,
        saveCurrentGame,
        getCurrentGame
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