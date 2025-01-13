import BoardCell from "./BoardCell.tsx";
import {Fragment, ReactNode} from "react";
import {BoardType, PlayerType} from "../../types/Board.ts";

type Props = {
    board: BoardType;
    handleCellClick: (coords: number[]) => void;
    currentPlayer: PlayerType;
}

const BoardComponent = ({ board, handleCellClick, currentPlayer }: Props) => {
    console.log("board", board)
    return (
        <div className="flex justify-center py-4">
            <div className="grid grid-cols-3 gap-4">
                {board && (
                    board.map((line: PlayerType[], index: number): ReactNode => {
                        return (
                            <Fragment key={index}>
                                {line.map((cell: PlayerType, idx: number) => <BoardCell boardCell={cell} coords={[index, idx]} key={idx}
                                                                                        onCellClick={handleCellClick}
                                                                                        currentPlayer={currentPlayer}/>)}
                            </Fragment>
                        )
                    })
                )}
            </div>
        </div>
    );
};

export default BoardComponent;