import cross from "../../assets/images/game/cross.svg";
import circle from "../../assets/images/game/circle.svg";
import { PlayerType } from "../../types/Board.ts";
import { useGame } from "../../context/GameContext";

type Props = {
    boardCell: PlayerType;
    coords: number[];
}

const BoardCell = ({ boardCell, coords }: Props) => {
    const { handleCellClick } = useGame();

    return (
        <div
            className={"bg-grey-medium rounded-lg h-[10vh] w-[10vh] shadow-cellGreyShadow"}
            onClick={() => handleCellClick(coords)}
        >
            {boardCell === "X" && <img src={cross} alt={boardCell} className={"p-5"}/>}
            {boardCell === "O" && <img src={circle} alt={boardCell} className={"p-5"}/>}
        </div>
    );
};

export default BoardCell;