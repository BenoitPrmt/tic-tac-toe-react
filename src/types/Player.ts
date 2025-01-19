import {CoordinatesType} from "./Board.ts";

export type PlayerType = "" | "X" | "O";

export type PlayerCellType = PlayerType | "WX" | "WO" | "NX" | "NO"; // WX & WO : Winner cells -- NX & NO : Next deleted cell

export type PlayerScoreType = {
    username: string;
    score: number;
    timestamp: Date;
    gamemode: "normal" | "threeShots";
}

export type PlayerLeaderboardType = {
    rank: number;
    username: string;
    score: number;
    timestamp: Date;
    gamemode: "normal" | "threeShots";
}

// -- WINNER TYPES --

export type WinnerType = PlayerType | "D";

export type WinnerData = {
    winner: WinnerType;
    coords?: CoordinatesType[];
};