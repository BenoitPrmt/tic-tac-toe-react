import cross from "../../assets/images/game/cross.svg";
import circle from "../../assets/images/game/circle.svg";
import {PlayerType} from "../../types/Board.ts";
import {useState} from "react";

type Props = {
    boardCell: PlayerType;
    coords: number[];
    onCellClick: (coords: number[]) => void;
    currentPlayer: PlayerType;
}

const BoardCell = ({ boardCell, coords, onCellClick, currentPlayer }: Props) => {
    const [cell, setCell] = useState<PlayerType>(boardCell)

    const handleClick = () => {
        if (cell != "") return;
        setCell(currentPlayer);
        onCellClick(coords);
    }

    return (
        <div className={"bg-grey-medium rounded-lg h-[10vh] w-[10vh] shadow-[0px_7px_0px_0px_#132C36]"} onClick={handleClick}>
            {cell === "X" && <img src={cross} alt={cell} className={"p-5"}/>}
            {cell === "O" && <img src={circle} alt={cell} className={"p-5"}/>}
        </div>
    );
};

export default BoardCell;