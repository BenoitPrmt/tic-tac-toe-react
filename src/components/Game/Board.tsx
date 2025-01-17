import { Fragment } from "react";
import BoardCell from "./BoardCell";
import {PlayerCellType} from "../../types/Board";
import { useGame } from "../../hooks/useGame";

const BoardComponent = () => {
    const { board } = useGame();

    return (
        <div className="flex justify-center py-4">
            <div className="grid grid-cols-3 gap-4">
                {board.map((line: PlayerCellType[], index: number) => (
                    <Fragment key={index}>
                        {line.map((cell: PlayerCellType, idx: number) => (
                            <BoardCell
                                boardCell={cell}
                                coords={[index, idx]}
                                key={idx}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default BoardComponent;