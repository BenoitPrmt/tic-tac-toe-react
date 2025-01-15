import cross from "../../assets/images/game/cross.svg";
import circle from "../../assets/images/game/circle.svg";
import { PlayerType } from "../../types/Board.ts";
import { useGame } from "../../context/GameContext";
import Circle from "../Images/Circle.tsx";
import Cross from "../Images/Cross.tsx";

type Props = {
    boardCell: PlayerType;
    coords: number[];
}

const BoardCell = ({ boardCell, coords }: Props) => {
    const { handleCellClick, currentPlayer, isComputerTurn } = useGame();

    return (
        <div
            className={"bg-grey-medium rounded-lg h-[10vh] w-[10vh] shadow-cellGreyShadow"}
            onClick={() => handleCellClick(coords)}
        >
            {boardCell === "X" && <Cross className={"p-5"}/>}
            {boardCell === "O" && <Circle className={"p-5"} />}
            {!isComputerTurn && boardCell === "" && <img src={currentPlayer === "X" ? cross : circle} alt={boardCell} className={"p-5 opacity-0 hover:opacity-25"}/>}
        </div>
    );
};

export default BoardCell;