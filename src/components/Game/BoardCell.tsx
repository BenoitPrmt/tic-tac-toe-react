import {PlayerCellType} from "../../types/Board.ts";
import { useGame } from "../../hooks/useGame";
import Circle from "../Images/Circle.tsx";
import Cross from "../Images/Cross.tsx";
import {memo} from "react";

type Props = {
    boardCell: PlayerCellType;
    coords: number[];
}

const BoardCell = memo(({ boardCell, coords }: Props) => {
    const { handleCellClick, currentPlayer, isComputerTurn } = useGame();

    return (
        <div
            className={`rounded-lg h-[10vh] w-[10vh] hover:translate-y-0.5 shadow-cellGreyShadow ${boardCell.startsWith("W") ? (boardCell[boardCell.length - 1] === "X" ? "bg-primary" : "bg-secondary") : "bg-grey-medium"}`}
            onClick={() => handleCellClick(coords)}
        >
            {boardCell[boardCell.length - 1] === "X" &&
                <Cross className={`p-5 ${boardCell.startsWith("N") ? "animate-pulse" : ""}`} color={boardCell.startsWith("W") ? "greyDark" : "primary"}/>}
            {boardCell[boardCell.length - 1] === "O" &&
                <Circle className={`p-5 ${boardCell.startsWith("N") ? "animate-pulse" : ""}`} color={boardCell.startsWith("W") ? "greyDark" : "secondary"}/>}
            {!isComputerTurn && boardCell === "" && (currentPlayer === "X" ? <Cross className={"p-5 opacity-0 hover:opacity-25"}/> : <Circle className={"p-5 opacity-0 hover:opacity-25"}/>)}
        </div>
    );
});

export default BoardCell;