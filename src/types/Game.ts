import {PlayerType} from "./Player.ts";

export type CurrentGame = {
    playerOne: string;
    playerOneScore: number;
    playerTwo: string;
    playerTwoScore: number;
    draws: number;
    againstComputer: boolean;
    isGame3Shots: boolean;
    isXTurn: boolean;
}

export type Shot = {
    x: number;
    y: number;
    placedAt: Date;
    type: PlayerType;
}