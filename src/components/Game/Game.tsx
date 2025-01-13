import {useEffect, useState} from "react";
import {PlayerType, BoardType} from "../../types/Board.ts";
import BoardComponent from "./Board.tsx";
import PlayerTurn from "./PlayerTurn.tsx";

const GameComponent = () => {
    const [board, setBoard] = useState<BoardType>([]);
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>("X");
    const [winner, setWinner] = useState<PlayerType>("");

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

    const checkIfCellsAreWinning = (cells: PlayerType[]): PlayerType =>  {
        const [cellA, cellB, cellC] = cells;
        if (cellA !== "" && (cellA === cellB) && (cellB === cellC)) return cellA;
        return "";
    }

    const checkVictory = () => {
        // Lines
        board.forEach((line: PlayerType[]) => {
            const isWinningLine: PlayerType = checkIfCellsAreWinning(line);
            if (isWinningLine !== "") {
                setWinner(isWinningLine);
            }
        })

        // Columns
        for(let i = 0; i < board.length; i++) {
            const column: PlayerType[] = [];
            for(let j = 0; j < board[i].length; j++) {
                column.push(board[j][i]);
            }
            const isWinningColumn: PlayerType = checkIfCellsAreWinning(column);
            if (isWinningColumn !== "") {
                setWinner(isWinningColumn);
            }
        }

        // Diagonals
        const isWinningDiagA: PlayerType = checkIfCellsAreWinning([
            board[0][0],
            board[1][1],
            board[2][2],
        ]);
        if (isWinningDiagA !== "") {
            setWinner(isWinningDiagA);
        }
        const isWinningDiagB: PlayerType = checkIfCellsAreWinning([
            board[0][2],
            board[1][1],
            board[2][0],
        ]);
        if (isWinningDiagB !== "") {
            setWinner(isWinningDiagB);
        }
    }

    const handleCellClick = (coords: number[]) => {
        if (board[coords[0]][coords[1]] != "") return;
        const updatedBoard: BoardType = board;
        updatedBoard[coords[0]][coords[1]] = currentPlayer;
        setBoard(updatedBoard);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        checkVictory();
    }

    useEffect(() => {
        console.log(`${winner} a gagné la partie !`);
    }, [winner]);

    return (
        <>
            <div className="flex justify-center">
                <PlayerTurn player={currentPlayer} />
            </div>

            <p className={"text-grey-light"}>{winner}</p>

            <BoardComponent board={board} handleCellClick={handleCellClick} currentPlayer={currentPlayer} />
        </>
    );
};

export default GameComponent;