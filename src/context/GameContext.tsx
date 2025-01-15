import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {BoardType, PlayerType, WinnerType} from '../types/Board';
import {usePersistance} from "./PersistanceContext.tsx";
import {CurrentGame, Shot} from "../types/Game.ts";

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
    setIsGame3Shots: (is3Shots: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const { saveBoard, getSavedBoard, savePlayerScore, getCurrentGame, saveCurrentGame, getPlayerScore, saveLastShots, getLastShots } = usePersistance();

    const currentGame = getCurrentGame();
    const lastShotsData: Shot[] | null = getLastShots();

    const [board, setBoard] = useState<BoardType>([]);
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(currentGame?.isXTurn ? "X" : "O");
    const [winner, setWinner] = useState<WinnerType>("");
    const [isGameAgainstComputer, setIsGameAgainstComputer] = useState<boolean>(currentGame?.againstComputer ?? true);
    const [isGame3Shots, setIsGame3Shots] = useState<boolean>(currentGame?.isGame3Shots ?? true);

    const [isComputerTurn, setIsComputerTurn] = useState<boolean>(isGameAgainstComputer ? !currentGame?.isXTurn : false);

    const [lastShots, setLastShots] = useState<Shot[]>(lastShotsData ?? []);

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

    const checkIfCellsAreWinning = (cells: PlayerType[]): PlayerType => {
        const [cellA, cellB, cellC] = cells;
        if (cellA !== "" && (cellA === cellB) && (cellB === cellC)) return cellA;
        return "";
    };

    const checkVictory = (currentBoard: BoardType): WinnerType => {
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
    };

    const getRandomEmptyCell = (currentBoard: BoardType): number[] | null => {
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
    }

    const makeMove = (coords: number[], player: PlayerType, currentBoard: BoardType): BoardType | null => {
        const [row, col] = coords;
        if (currentBoard[row][col] !== "") return null;

        const newBoard = currentBoard.map(r => [...r]);
        newBoard[row][col] = player;

        if (isGame3Shots) {
            const newLastShots = [
                ...lastShots,
                {
                    x: row,
                    y: col,
                    type: player,
                    placedAt: new Date()
                }
            ]
                .sort((a: Shot, b: Shot) => {
                    return new Date(a.placedAt).getTime() - new Date(b.placedAt).getTime();
                });

            if (newLastShots.length > 6) {
                const removedShot: Shot | undefined = newLastShots.shift();
                if (removedShot) newBoard[removedShot.x][removedShot.y] = "";
            }

            setLastShots(newLastShots);
        }

        return newBoard;
    };

    useEffect(() => {
        saveLastShots(lastShots);
    }, [lastShots, saveLastShots]);

    // TODO: Regrouper ça avec cell click
    const computerTurn = (currentBoard: BoardType) => {
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

        saveCurrentGame({
            playerOne: playerOneUsername,
            playerOneScore: playerOneScore,
            playerTwo: playerTwoUsername,
            playerTwoScore: playerTwoScore,
            draws: draws,
            againstComputer: isGameAgainstComputer,
            isGame3Shots: isGame3Shots,
            isXTurn: true
        });

        setCurrentPlayer("X");
        setIsComputerTurn(false);
    }

    useEffect(() => {
        if ((isComputerTurn && isGameAgainstComputer && currentPlayer === "O") && !winner) {
            const timer = setTimeout(() => {
                computerTurn(board);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isComputerTurn, winner, computerTurn, board]);

    const handleCellClick = (coords: number[]) => {
        if (winner || isComputerTurn) return;

        const newBoard: BoardType | null = makeMove(coords, currentPlayer, board);
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
                isGame3Shots: isGame3Shots,
                isXTurn: !(currentPlayer === "X")
            });
        }

        setCurrentPlayer((prevPlayer) => prevPlayer === "O" ? "X" : "O");
        if (isGameAgainstComputer) {
            setIsComputerTurn(true);
        }
    }

    const handleVictory = (gameWinner: WinnerType) => {
        setWinner(gameWinner);
        saveBoard([]);
        saveLastShots([]);
        setLastShots([]);

        const currentGame: CurrentGame = {
            playerOne: playerOneUsername,
            playerOneScore: playerOneScore,
            playerTwo: playerTwoUsername,
            playerTwoScore: playerTwoScore,
            draws: draws,
            againstComputer: isGameAgainstComputer,
            isGame3Shots: isGame3Shots,
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
        saveLastShots([]);
        setLastShots([]);

        if (resetScores && !isGameAgainstComputer) {
            setPlayerOneScore(0);
            setPlayerTwoScore(0);
            setDraws(0);
            saveCurrentGame(null);
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
        setIsGameAgainstComputer,
        setIsGame3Shots
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