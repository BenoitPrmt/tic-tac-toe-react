export type BoardType = PlayerCellType[][];

export type CoordinatesType = {
    x: number;
    y: number;
};

export type PlayerType = "" | "X" | "O";

export type PlayerCellType = PlayerType | "WX" | "WO";

export type WinnerType = PlayerType | "D";

export type WinnerData = {
    winner: WinnerType;
    coords?: CoordinatesType[];
};
