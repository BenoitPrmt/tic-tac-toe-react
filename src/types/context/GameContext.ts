import {BoardType} from "../Board.ts";
import {PlayerType, WinnerType} from "../Player.ts";

export interface GameContextType {
    board: BoardType;
    resetBoard: (resetScores: boolean) => void;
    resetAndSave: () => void;
    currentPlayer: PlayerType;
    winner: WinnerType;
    handleCellClick: (coords: number[]) => void;
    isComputerTurn: boolean;
    playerOneUsername: string;
    setPlayerOneUsername: (username: string) => void;
    playerOneScore: number;
    setPlayerOneScore: (score: number) => void;
    playerTwoUsername: string;
    setPlayerTwoUsername: (username: string) => void;
    playerTwoScore: number;
    setPlayerTwoScore: (score: number) => void;
    draws: number;
    setIsGameAgainstComputer: (isAgainstComputer: boolean) => void;
    isGame3Shots: boolean;
    setIsGame3Shots: (is3Shots: boolean) => void;
    hasGameLaunched: () => boolean;
}