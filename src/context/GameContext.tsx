import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {BoardType, PlayerType, WinnerType} from '../types/Board';
import {usePersistance} from "./PersistanceContext.tsx";
import {CurrentGame} from "../types/Game.ts";

interface GameContextType {
    board: BoardType;
    resetBoard: (resetScores: boolean) => void;
    currentPlayer: PlayerType;
    winner: WinnerType;
    handleCellClick: (coords: number[]) => void;
    isComputerTurn: boolean;
    playerOneUsername: string;
    setPlayerOneUsername: (username: string) => void;
    playerOneScore: number;
    setPlayerOneScore: (score: number) => void;
    playerTwoUsername: string;
    setPlayerTwoUsername: (username: string) => void;
    playerTwoScore: number;
    setPlayerTwoScore: (score: number) => void;
    draws: number;
    setIsGameAgainstComputer: (isAgainstComputer: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const { saveBoard, getSavedBoard, savePlayerScore, getCurrentGame, saveCurrentGame, getPlayerScore } = usePersistance();

    const currentGame = getCurrentGame();

    const [board, setBoard] = useState<BoardType>([]);
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(currentGame?.isXTurn ? "X" : "O");
    const [winner, setWinner] = useState<WinnerType>("");
    const [isComputerTurn, setIsComputerTurn] = useState<boolean>(false);
    const [isGameAgainstComputer, setIsGameAgainstComputer] = useState<boolean>(currentGame?.againstComputer ?? true);

    const [playerOneUsername, setPlayerOneUsername] = useState<string>(currentGame?.playerOne ?? "Joueur 1");
    const [playerTwoUsername, setPlayerTwoUsername] = useState<string>(currentGame?.playerTwo ?? "CPU");

    const [playerOneScore, setPlayerOneScore] = useState<number>(
        currentGame ?
            currentGame.playerOneScore :
            (isGameAgainstComputer ? getPlayerScore(playerOneUsername) : 0)
    );

    const [playerTwoScore, setPlayerTwoScore] = useState<number>(
        currentGame ?
            currentGame.playerTwoScore :
            (isGameAgainstComputer ? getPlayerScore(playerTwoUsername) : 0)
    );

    const [draws, setDraws] = useState<number>(currentGame?.draws ?? 0);

    useEffect(() => {
        const savedBoard: BoardType = getSavedBoard();
        if (savedBoard.length === 0) {
            initBoard();
        } else {
            setBoard(savedBoard);
        }
    }, []);

    useEffect(() => {
        if (isGameAgainstComputer) {
            setPlayerOneScore(getPlayerScore(playerOneUsername));
            setPlayerTwoScore(getPlayerScore(playerTwoUsername));
        }
    }, [playerOneUsername, playerTwoUsername, isGameAgainstComputer]);

    const initBoard = () => {
        const tempBoard: BoardType = [];
        for(let i: number = 0; i < 3; i++) {
            tempBoard[i] = [];
            for(let j: number = 0; j< 3; j++) {
                tempBoard[i][j] = "";
            }
        }
        setBoard(tempBoard);
    }

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

    // TODO: Regrouper ça avec cell click
    const computerTurn = useCallback((currentBoard: BoardType) => {
        const position = getRandomEmptyCell(currentBoard);
        if (!position) return;

        const newBoard = makeMove(position, "O", currentBoard);
        if (!newBoard) return;

        setBoard(newBoard);
        saveBoard(newBoard);
        const gameWinner = checkVictory(newBoard);
        if (gameWinner) {
            handleVictory(gameWinner);
        }
        setCurrentPlayer("X");
        setIsComputerTurn(false);
    }, [getRandomEmptyCell, makeMove, checkVictory]);

    useEffect(() => {
        if ((isComputerTurn || (isGameAgainstComputer && currentPlayer === "O")) && !winner) {
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
        saveBoard(newBoard);
        const gameWinner = checkVictory(newBoard);
        if (gameWinner) {
            handleVictory(gameWinner);
        } else {
            saveCurrentGame({
                playerOne: playerOneUsername,
                playerOneScore: playerOneScore,
                playerTwo: playerTwoUsername,
                playerTwoScore: playerTwoScore,
                draws: draws,
                againstComputer: isGameAgainstComputer,
                isXTurn: !(currentPlayer === "X")
            });
        }

        setCurrentPlayer((prevPlayer) => prevPlayer === "O" ? "X" : "O");
        if (isGameAgainstComputer) {
            setIsComputerTurn(true);
        }
    }, [winner, isComputerTurn, makeMove, currentPlayer, board, checkVictory, isGameAgainstComputer]);

    const handleVictory = (gameWinner: WinnerType) => {
        setWinner(gameWinner);
        saveBoard([]);

        const currentGame: CurrentGame = {
            playerOne: playerOneUsername,
            playerOneScore: playerOneScore,
            playerTwo: playerTwoUsername,
            playerTwoScore: playerTwoScore,
            draws: draws,
            againstComputer: isGameAgainstComputer,
            isXTurn: currentPlayer === "X"
        };

        switch (gameWinner) {
            case "X":
                currentGame.playerOneScore += 1;
                if (isGameAgainstComputer) savePlayerScore(playerOneUsername, playerOneScore + 1);
                setPlayerOneScore((prevScore) => prevScore + 1);
                break;
            case "O":
                currentGame.playerTwoScore += 1;
                if (isGameAgainstComputer) savePlayerScore(playerTwoUsername, playerTwoScore + 1);
                setPlayerTwoScore((prevScore) => prevScore + 1);
                break;
            case "D":
                currentGame.draws += 1;
                setDraws((prevScore) => prevScore + 1);
                break;
        }
        saveCurrentGame(currentGame);
        return;
    }

    const resetBoard = (resetScores: boolean) => {
        initBoard();
        setCurrentPlayer("X");
        setWinner("");
        setIsComputerTurn(false);
        saveBoard([]);

        if (resetScores && !isGameAgainstComputer) {
            setPlayerOneScore(0);
            setPlayerTwoScore(0);
            setDraws(0);
            saveCurrentGame({
                playerOne: playerOneUsername,
                playerOneScore: 0,
                playerTwo: playerTwoUsername,
                playerTwoScore: 0,
                draws: 0,
                againstComputer: isGameAgainstComputer,
                isXTurn: true
            })
        }
    }

    const value = {
        board,
        currentPlayer,
        winner,
        handleCellClick,
        isComputerTurn,
        playerOneUsername,
        setPlayerOneUsername,
        playerOneScore,
        setPlayerOneScore,
        playerTwoUsername,
        setPlayerTwoUsername,
        playerTwoScore,
        setPlayerTwoScore,
        draws,
        resetBoard,
        setIsGameAgainstComputer
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