import {useEffect, useState} from "react";
import {PlayerType, BoardType} from "../../types/Board.ts";
import BoardComponent from "./Board.tsx";
import PlayerTurn from "./PlayerTurn.tsx";

const GameComponent = () => {
    const [board, setBoard] = useState<BoardType>([]);
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>("X");

    useEffect(() => {
        const tempBoard: BoardType = [];
        for(let i: number = 0; i < 3; i++) {
            tempBoard[i] = [];
            for(let j: number = 0; j< 3; j++) {
                tempBoard[i][j] = "";
            }
        }
        setBoard(tempBoard);
    }, []);

    const handleCellClick = () => {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    return (
        <>
            <div className="flex justify-center">
                <PlayerTurn player={currentPlayer} />
            </div>

            <BoardComponent board={board} handleCellClick={handleCellClick} currentPlayer={currentPlayer} />
        </>
    );
};

export default GameComponent;