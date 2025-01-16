import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {BoardType, PlayerCellType, PlayerType, WinnerData, WinnerType} from '../types/Board';
import {usePersistance} from "./PersistanceContext.tsx";
import {CurrentGame, Shot} from "../types/Game.ts";
import {PlayerScoreType} from "../types/Player.ts";

interface GameContextType {
    board: BoardType;
    resetBoard: (resetScores: boolean) => void;
    resetAndSave: () => void;
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
    hasGameLaunched: () => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const { saveBoard, getSavedBoard, savePlayerScore, getCurrentGame, saveCurrentGame, saveLastShots, getLastShots, saveCurrentPlayer, getCurrentPlayer } = usePersistance();

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
            currentGame.playerOneScore : 0
    );

    const [playerTwoScore, setPlayerTwoScore] = useState<number>(
        currentGame ?
            currentGame.playerTwoScore : 0
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

    const checkIfCellsAreWinning = (cells: PlayerCellType[]): PlayerType => {
        const [cellA, cellB, cellC]: PlayerCellType[] = cells;
        if (cellA[cellA.length-1] !== "" && (cellA[cellA.length-1] === cellB[cellB.length-1]) && (cellB[cellB.length-1] === cellC[cellC.length-1])) {
            return cellA[cellA.length-1] as PlayerType;
        }
        return "";
    };

    const checkVictory = (currentBoard: BoardType): WinnerData => {
        // Lines
        for (const [index, line] of currentBoard.entries()) {
            const playerWinner = checkIfCellsAreWinning(line);
            if (playerWinner !== "") return {
                winner: playerWinner,
                coords: [
                    { x: index, y: 0 },
                    { x: index, y: 1 },
                    { x: index, y: 2 },
                ]
            };
        }

        // Columns
        for(let i = 0; i < currentBoard.length; i++) {
            const column: PlayerCellType[] = [];
            const columnCoords: number[][] = [];
            for(let j = 0; j < currentBoard[i].length; j++) {
                column.push(currentBoard[j][i]);
                columnCoords.push([j, i]);
            }
            const playerWinner = checkIfCellsAreWinning(column);
            if (playerWinner !== "") return {
                winner: playerWinner,
                coords: [
                    { x: columnCoords[0][0], y: columnCoords[0][1] },
                    { x: columnCoords[1][0], y: columnCoords[1][1] },
                    { x: columnCoords[2][0], y: columnCoords[2][1] },
                ]
            };
        }

        // Diagonals
        const diagA = checkIfCellsAreWinning([
            currentBoard[0][0],
            currentBoard[1][1],
            currentBoard[2][2],
        ]);
        if (diagA !== "") return {
            winner: diagA,
            coords: [
                { x: 0, y: 0 },
                { x: 1, y: 1 },
                { x: 2, y: 2 },
            ]
        };

        const diagB = checkIfCellsAreWinning([
            currentBoard[0][2],
            currentBoard[1][1],
            currentBoard[2][0],
        ]);
        if (diagB !== "") return {
            winner: diagB,
            coords: [
                { x: 0, y: 2 },
                { x: 1, y: 1 },
                { x: 2, y: 0 },
            ]
        };

        // Check for draw
        if (currentBoard.flat().every(cell => cell !== "")) {
            return {
                winner: "D"
            };
        }

        return {
            winner: ""
        };
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
            if (newLastShots.length >= 5) {
                const nextDeletedShot: Shot = newLastShots[0];
                newBoard[nextDeletedShot.x][nextDeletedShot.y] = nextDeletedShot.type === "X" ? "NX" : "NO";
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

        const gameWinner = checkVictory(newBoard);
        if (gameWinner.winner) {
            handleVictory(gameWinner);
            if (gameWinner.coords) {
                for(const coord of gameWinner.coords) {
                    newBoard[coord.x][coord.y] = gameWinner.winner === "X" ? "WX" : "WO";
                }
            }
        }

        setBoard(newBoard);
        saveBoard(newBoard);

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

        const gameWinner = checkVictory(newBoard);
        if (gameWinner.winner) {
            handleVictory(gameWinner);
            if (gameWinner.coords) {
                for(const coord of gameWinner.coords) {
                    newBoard[coord.x][coord.y] = gameWinner.winner === "X" ? "WX" : "WO";
                }
            }
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

        setBoard(newBoard);
        saveBoard(newBoard);

        setCurrentPlayer((prevPlayer) => prevPlayer === "O" ? "X" : "O");
        if (isGameAgainstComputer) {
            setIsComputerTurn(true);
        }
    }

    const handleVictory = (winnerData: WinnerData) => {
        setWinner(winnerData.winner);
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

        switch (winnerData.winner) {
            case "X":
                currentGame.playerOneScore += 1;
                if (isGameAgainstComputer) saveCurrentPlayer({
                    username: playerOneUsername,
                    score: playerOneScore + 1,
                    timestamp: new Date(),
                    gamemode: isGame3Shots ? "threeShots" : "normal"
                });
                setPlayerOneScore((prevScore) => prevScore + 1);
                break;
            case "O":
                currentGame.playerTwoScore += 1;
                if (isGameAgainstComputer) {
                    savePlayerScore({
                        username: playerOneUsername,
                        score: playerOneScore,
                        timestamp: new Date(),
                        gamemode: isGame3Shots ? "threeShots" : "normal"
                    });
                    saveCurrentPlayer({
                        username: playerOneUsername,
                        gamemode: isGame3Shots ? "threeShots" : "normal",
                        score: 0,
                        timestamp: new Date()
                    })
                }
                setPlayerOneScore(0);
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

        if (resetScores && !isGameAgainstComputer) {
            setPlayerOneScore(0);
            setPlayerTwoScore(0);
            setDraws(0);
            saveCurrentGame(null);
        } else {
            initBoard();
        }

        setCurrentPlayer("X");
        setWinner("");
        setIsComputerTurn(false);
        saveBoard([]);
        saveLastShots([]);
        setLastShots([]);
    }

    const resetAndSave = () => {
        if (isGameAgainstComputer) {
            const currentPlayer: PlayerScoreType | null = getCurrentPlayer()
            if (currentPlayer) {
                savePlayerScore(currentPlayer);
                saveCurrentPlayer(null);
            }
            setIsComputerTurn(false);
        }
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
            isGame3Shots: isGame3Shots,
            isXTurn: true
        });

        setCurrentPlayer("X");
        setWinner("");
        initBoard();
        saveBoard([]);
        saveLastShots([]);
        setLastShots([]);
    }

    const hasGameLaunched = (): boolean => {
        return board.flat().filter((cell) => cell === "").length !== 9 && currentGame != null;
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
        resetAndSave,
        setIsGameAgainstComputer,
        setIsGame3Shots,
        hasGameLaunched
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