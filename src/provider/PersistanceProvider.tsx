import {ReactNode} from "react";
import {BoardType} from "../types/Board.ts";
import {PlayerLeaderboardType, PlayerScoreType} from "../types/Player.ts";
import {CurrentGame, Shot} from "../types/Game.ts";
import { PersistanceContext } from "../context/PersistanceContext.tsx";

export const PersistanceProvider = ({ children }: { children: ReactNode }) => {
    /**
     * Save the board in the local storage
     * @param board
     */
    const saveBoard = (board: BoardType) => {
        localStorage.setItem(
            'board',
            JSON.stringify(board)
        );
    }

    /**
     * Get the saved board from the local storage
     * @returns saved board
     */
    const getSavedBoard = (): BoardType => {
        return JSON.parse(localStorage.getItem('board') ?? "[]");
    }

    /**
     * Save the player score in the local storage
     * @param playerScore
     */
    const savePlayerScore = (playerScore: PlayerScoreType) => {
        if (playerScore.score === 0) return;
        const scores = localStorage.getItem("scores");
        if (scores) {
            const scoresData: PlayerScoreType[] = JSON.parse(scores);
            scoresData.push(playerScore);
            localStorage.setItem("scores", JSON.stringify(scoresData));
        } else {
            localStorage.setItem("scores", JSON.stringify([playerScore]));
        }
    }

    /**
     * Save the current game in the local storage
     * @param currentGame
     */
    const saveCurrentGame = (currentGame: CurrentGame | null) => {
        if (!currentGame) {
            localStorage.removeItem("current");
        } else {
            localStorage.setItem("current", JSON.stringify(currentGame));
        }
    }

    /**
     * Get the current game from the local storage
     * @returns current game
     */
    const getCurrentGame = (): CurrentGame|null => {
        const currentGame = localStorage.getItem("current");
        if (currentGame) {
            return JSON.parse(currentGame);
        }
        return null;
    }

    /**
     * Save the current player in the local storage
     * @param currentPlayer
     */
    const saveCurrentPlayer = (currentPlayer: PlayerScoreType | null) => {
        if (!currentPlayer) {
            localStorage.removeItem("currentPlayer");
        } else {
            localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
        }
    }

    /**
     * Get the current player from the local storage
     * @returns current player
     */
    const getCurrentPlayer = (): PlayerScoreType | null => {
        const currentPlayer = localStorage.getItem("currentPlayer");
        if (currentPlayer) {
            return JSON.parse(currentPlayer)
        }
        return null;
    }

    /**
     * Save the last shots in the local storage
     * @param shots
     */
    const saveLastShots = (shots: Shot[]): void => {
        localStorage.setItem("lastShots", JSON.stringify(shots));
    }

    /**
     * Get the last shots from the local storage
     * @returns last shots
     */
    const getLastShots = (): Shot[] | null => {
        const lastShots = localStorage.getItem("lastShots");
        if (lastShots) {
            return JSON.parse(lastShots);
        }
        return null;
    }

    /**
     * Get the leaderboard from the local storage
     * @returns leaderboard
     */
    const getLeaderboard = (): PlayerLeaderboardType[] => {
        const scores = localStorage.getItem("scores");
        if (scores) {
            const currentPlayer: PlayerScoreType | null = getCurrentPlayer();
            const sortedData: PlayerScoreType[] = JSON.parse(scores);

            if (currentPlayer) {
                sortedData.push(currentPlayer);
            }

            const leaderboard: PlayerLeaderboardType[] = sortedData.sort((a: PlayerScoreType, b: PlayerScoreType) => b.score - a.score)
                .filter((item: PlayerScoreType) => item.score > 0)
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
        getLeaderboard
    };

    return <PersistanceContext.Provider value={value}>{children}</PersistanceContext.Provider>;
};