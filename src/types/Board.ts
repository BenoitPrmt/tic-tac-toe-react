export type BoardType = PlayerCellType[][];

export type CoordinatesType = {
    x: number;
    y: number;
};

export type PlayerType = "" | "X" | "O";

export type PlayerCellType = PlayerType | "WX" | "WO" | "NX" | "NO"; // WX & WO : Winner cells -- NX & NO : Next deleted cell

export type WinnerType = PlayerType | "D";

export type WinnerData = {
    winner: WinnerType;
    coords?: CoordinatesType[];
};
