import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { BoardType, PlayerType, WinnerType } from '../types/Board';

interface GameContextType {
    board: BoardType;
    currentPlayer: PlayerType;
    winner: WinnerType;
    handleCellClick: (coords: number[]) => void;
    isComputerTurn: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [board, setBoard] = useState<BoardType>([]);
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>("X");
    const [winner, setWinner] = useState<WinnerType>("");
    const [isComputerTurn, setIsComputerTurn] = useState(false);
    const isGameAgainstComputer = true;

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

    const checkIfCellsAreWinning = useCallback((cells: PlayerType[]): PlayerType => {
        const [cellA, cellB, cellC] = cells;
        if (cellA !== "" && (cellA === cellB) && (cellB === cellC)) return cellA;
        return "";
    }, []);

    const checkVictory = useCallback((currentBoard: BoardType): WinnerType => {
        // Lines
        for (const line of currentBoard) {
            const isWinningLine = checkIfCellsAreWinning(line);
            if (isWinningLine !== "") return isWinningLine;
        }

        // Columns
        for(let i = 0; i < currentBoard.length; i++) {
            const column: PlayerType[] = [];
            for(let j = 0; j < currentBoard[i].length; j++) {
                column.push(currentBoard[j][i]);
            }
            const isWinningColumn = checkIfCellsAreWinning(column);
            if (isWinningColumn !== "") return isWinningColumn;
        }

        // Diagonals
        const diagA = checkIfCellsAreWinning([
            currentBoard[0][0],
            currentBoard[1][1],
            currentBoard[2][2],
        ]);
        if (diagA !== "") return diagA;

        const diagB = checkIfCellsAreWinning([
            currentBoard[0][2],
            currentBoard[1][1],
            currentBoard[2][0],
        ]);
        if (diagB !== "") return diagB;

        // Check for draw
        if (currentBoard.flat().every(cell => cell !== "")) {
            return "D";
        }

        return "";
    }, [checkIfCellsAreWinning]);

    const getRandomEmptyCell = useCallback((currentBoard: BoardType): number[] | null => {
        const emptyCells: number[][] = [];
        for(let i = 0; i < currentBoard.length; i++) {
            for(let j = 0; j < currentBoard[i].length; j++) {
                if(currentBoard[i][j] === "") {
                    emptyCells.push([i, j]);
                }
            }
        }
        if (emptyCells.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }, []);

    const makeMove = useCallback((coords: number[], player: PlayerType, currentBoard: BoardType) => {
        const [row, col] = coords;
        if (currentBoard[row][col] !== "") return null;

        const newBoard = currentBoard.map(r => [...r]);
        newBoard[row][col] = player;
        return newBoard;
    }, []);

    const computerTurn = useCallback((currentBoard: BoardType) => {
        const position = getRandomEmptyCell(currentBoard);
        if (!position) return;

        const newBoard = makeMove(position, "O", currentBoard);
        if (!newBoard) return;

        setBoard(newBoard);
        const gameWinner = checkVictory(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
        }
        setCurrentPlayer("X");
        setIsComputerTurn(false);
    }, [getRandomEmptyCell, makeMove, checkVictory]);

    useEffect(() => {
        if (isComputerTurn && !winner) {
            const timer = setTimeout(() => {
                computerTurn(board);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isComputerTurn, winner, computerTurn, board]);

    const handleCellClick = useCallback((coords: number[]) => {
        if (winner || isComputerTurn) return;

        const newBoard = makeMove(coords, currentPlayer, board);
        if (!newBoard) return;

        setBoard(newBoard);
        const gameWinner = checkVictory(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
            return;
        }

        setCurrentPlayer("O");
        if (isGameAgainstComputer) {
            setIsComputerTurn(true);
        }
    }, [winner, isComputerTurn, makeMove, currentPlayer, board, checkVictory, isGameAgainstComputer]);

    const value = {
        board,
        currentPlayer,
        winner,
        handleCellClick,
        isComputerTurn
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};