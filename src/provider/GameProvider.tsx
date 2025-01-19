import {ReactNode, useCallback, useEffect, useState} from "react";
import {usePersistance} from "../hooks/usePersistance.ts";
import {CurrentGame, Shot} from "../types/Game.ts";
import {BoardType} from "../types/Board.ts";
import {BOARD_SIZE, COMPUTER_MOVE_DELAY, INITIAL_BOARD, MAX_SHOTS} from "../constants/game.ts";
import {PlayerCellType, PlayerScoreType, PlayerType, WinnerData, WinnerType} from "../types/Player.ts";
import {GameContext} from "../context/GameContext.tsx";
import {changeFavicon} from "../utils/favicon.ts";

export const GameProvider = ({children}: { children: ReactNode }) => {
    const {
        saveBoard,
        getSavedBoard,
        savePlayerScore,
        getCurrentGame,
        saveCurrentGame,
        saveLastShots,
        getLastShots,
        saveCurrentPlayer,
        getCurrentPlayer
    } = usePersistance();

    const currentGame = getCurrentGame();
    const lastShotsData: Shot[] | null = getLastShots();

    const [board, setBoard] = useState<BoardType>(getSavedBoard().length === 0 ? INITIAL_BOARD : getSavedBoard());
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(currentGame?.isXTurn ? "X" : "O");
    const [winner, setWinner] = useState<WinnerType>("");
    const [isGameAgainstComputer, setIsGameAgainstComputer] = useState<boolean>(currentGame?.againstComputer ?? true);
    const [isGame3Shots, setIsGame3Shots] = useState<boolean>(currentGame?.isGame3Shots ?? true);
    const [isComputerTurn, setIsComputerTurn] = useState<boolean>(isGameAgainstComputer ? !currentGame?.isXTurn : false);
    const [lastShots, setLastShots] = useState<Shot[]>(lastShotsData ?? []);

    const [playerOneUsername, setPlayerOneUsername] = useState<string>(currentGame?.playerOne ?? "Joueur 1");
    const [playerTwoUsername, setPlayerTwoUsername] = useState<string>(currentGame?.playerTwo ?? "CPU");
    const [playerOneScore, setPlayerOneScore] = useState<number>(currentGame?.playerOneScore ?? 0);
    const [playerTwoScore, setPlayerTwoScore] = useState<number>(currentGame?.playerTwoScore ?? 0);
    const [draws, setDraws] = useState<number>(currentGame?.draws ?? 0);

    /**
     * Save the current game state to the local storage with PersistanceContext
     * @param gameState - The game state to save
     */
    const saveGameState = useCallback((gameState: Partial<CurrentGame>) => {
        saveCurrentGame({
            playerOne: playerOneUsername,
            playerOneScore: playerOneScore,
            playerTwo: playerTwoUsername,
            playerTwoScore: playerTwoScore,
            draws: draws,
            againstComputer: isGameAgainstComputer,
            isGame3Shots: isGame3Shots,
            isXTurn: currentPlayer === "X",
            ...gameState
        });
    }, [saveCurrentGame, playerOneUsername, playerOneScore, playerTwoUsername, playerTwoScore, draws, isGameAgainstComputer, isGame3Shots, currentPlayer]);

    /**
     * Check if the cells at passed indexes are winning
     * @param cells - The cells to check
     *
     * @returns PlayerType - The winner
     */
    const checkIfCellsAreWinning = useCallback((cells: PlayerCellType[]): PlayerType => {
        const [cellA, cellB, cellC]: PlayerCellType[] = cells;
        if (cellA !== "" && (cellA[cellA.length - 1] === cellB[cellB.length - 1]) && (cellB[cellB.length - 1] === cellC[cellC.length - 1])) {
            return cellA[cellA.length - 1] as PlayerType;
        }
        return "";
    }, []);

    /**
     * Check if the current board has a winner
     * @param currentBoard - The current board
     *
     * @returns WinnerData - The winner data
     */
    const checkVictory = useCallback((currentBoard: BoardType): WinnerData => {
        // Lines check
        for (const [index, line] of currentBoard.entries()) {
            const playerWinner = checkIfCellsAreWinning(line);
            if (playerWinner) return {
                winner: playerWinner,
                coords: Array(BOARD_SIZE).fill(null).map((_, i) => ({x: index, y: i}))
            };
        }

        // Columns check
        for (let i = 0; i < BOARD_SIZE; i++) {
            const column = currentBoard.map(row => row[i]);
            const playerWinner = checkIfCellsAreWinning(column);
            if (playerWinner) return {
                winner: playerWinner,
                coords: Array(BOARD_SIZE).fill(null).map((_, j) => ({x: j, y: i}))
            };
        }

        // Diagonals check
        const diagonals = [
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (const diagonal of diagonals) {
            const cells = diagonal.map(([x, y]) => currentBoard[x][y]);
            const playerWinner = checkIfCellsAreWinning(cells);
            if (playerWinner) return {
                winner: playerWinner,
                coords: diagonal.map(([x, y]) => ({x, y}))
            };
        }

        return {
            winner: currentBoard.flat().every(cell => cell !== "") ? "D" : ""
        };
    }, [checkIfCellsAreWinning]);

    /**
     * Make a move on the board at the given coordinates, for the given player and return the new board
     * @param coords - The coordinates of the cell clicked
     * @param player - The player who clicked
     * @param currentBoard - The current board
     *
     * @returns BoardType | null - The new board or null if the move is invalid
     */
    const makeMove = useCallback((coords: number[], player: PlayerType, currentBoard: BoardType): BoardType | null => {
        const [row, col] = coords;
        if (currentBoard[row][col] !== "" || currentBoard[row][col].startsWith("W") || currentBoard[row][col].startsWith("N")) return null;

        const newBoard = currentBoard.map(r => [...r]);
        newBoard[row][col] = player;

        if (isGame3Shots) {
            const newShot = {
                x: row,
                y: col,
                type: player,
                placedAt: new Date()
            };

            const newLastShots = [...lastShots, newShot]
                .sort((a, b) => a.placedAt.getTime() - b.placedAt.getTime());

            if (newLastShots.length > MAX_SHOTS) {
                const removedShot = newLastShots.shift();
                if (removedShot) newBoard[removedShot.x][removedShot.y] = "";
            }
            if (newLastShots.length > 5) {
                const nextDeletedShot = newLastShots[0];
                newBoard[nextDeletedShot.x][nextDeletedShot.y] = nextDeletedShot.type === "X" ? "NX" : "NO";
            }

            setLastShots(newLastShots);
            saveLastShots(newLastShots);
        }

        return newBoard;
    }, [isGame3Shots, lastShots, saveLastShots]);

    /**
     * Handle the victory of a player and update the scores
     * @param winnerData - The winner data
     * @param newBoard - The new board
     */
    const handleVictory = useCallback((winnerData: WinnerData, newBoard: BoardType) => {
        setWinner(winnerData.winner);
        saveBoard([]);

        if (!isGame3Shots) {
            saveLastShots([]);
            setLastShots([]);
        }

        if (winnerData.coords) {
            winnerData.coords.forEach(coord => {
                newBoard[coord.x][coord.y] = winnerData.winner === "X" ? "WX" : "WO";
            });
        }

        const newScores = {
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
            draws: draws
        };

        switch (winnerData.winner) {
            case "X":
                if (isGameAgainstComputer) {
                    saveCurrentPlayer({
                        username: playerOneUsername,
                        score: playerOneScore + 1,
                        timestamp: new Date(),
                        gamemode: isGame3Shots ? "threeShots" : "normal"
                    });
                }
                newScores.playerOneScore += 1;
                setPlayerOneScore(prev => prev + 1);
                break;
            case "O":
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
                    });
                    newScores.playerOneScore = 0;
                    setPlayerOneScore(0);
                } else {
                    newScores.playerTwoScore += 1;
                    setPlayerTwoScore(prev => prev + 1);
                }
                break;
            case "D":
                newScores.draws += 1;
                setDraws(prev => prev + 1);
                break;
        }

        saveGameState({
            ...newScores,
            isXTurn: true
        });
    }, [saveBoard, isGame3Shots, playerOneScore, playerTwoScore, draws, saveGameState, saveLastShots, isGameAgainstComputer, saveCurrentPlayer, playerOneUsername, savePlayerScore]);

    /**
     * Process the move of a player and update the board
     * @param coords - The coordinates of the cell clicked
     * @param player - The player who clicked
     */
    const processMove = useCallback((coords: number[], player: PlayerType) => {
        const newBoard = makeMove(coords, player, board);
        if (!newBoard) return;

        const gameWinner = checkVictory(newBoard);
        if (gameWinner.winner) {
            handleVictory(gameWinner, newBoard);
        } else {
            saveGameState({isXTurn: player !== "X"});
        }

        setBoard(newBoard);
        saveBoard(newBoard);

        return gameWinner.winner;
    }, [board, checkVictory, handleVictory, makeMove, saveBoard, saveGameState]);

    /**
     * Handle the click on a cell of the board
     * @param coords - The coordinates of the cell clicked
     */
    const handleCellClick = useCallback((coords: number[]) => {
        if (winner || isComputerTurn) return;

        if (board[coords[0]][coords[1]] !== "" || board[coords[0]][coords[1]].startsWith("W") || board[coords[0]][coords[1]].startsWith("N")) return null;

        const hasWinner = processMove(coords, currentPlayer);
        if (!hasWinner) {
            setCurrentPlayer(prev => prev === "O" ? "X" : "O");
            if (isGameAgainstComputer) {
                setIsComputerTurn(true);
            }
        }
    }, [board, currentPlayer, isComputerTurn, isGameAgainstComputer, processMove, winner]);

    /**
     * Change the favicon according to the current player
     */
    useEffect(() => {
        changeFavicon(currentPlayer);
    }, [currentPlayer]);

    /**
     * Handle the computer turn
     * The computer will randomly play after a delay
     */
    useEffect(() => {
        if ((isComputerTurn && isGameAgainstComputer && currentPlayer === "O") && !winner) {
            const timer = setTimeout(() => {
                const emptyCells = board.reduce((acc: number[][], row, i) => {
                    row.forEach((cell, j) => {
                        if (!cell) acc.push([i, j]);
                    });
                    return acc;
                }, []);

                if (emptyCells.length) {
                    const randomPosition = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                    const hasWinner = processMove(randomPosition, "O");
                    if (!hasWinner) {
                        setCurrentPlayer("X");
                        setIsComputerTurn(false);
                    }
                }
            }, COMPUTER_MOVE_DELAY);
            return () => clearTimeout(timer);
        }
    }, [board, currentPlayer, isComputerTurn, isGameAgainstComputer, processMove, winner]);

    /**
     * Reset the board and the scores
     * @param resetScores - If the scores should be reset
     */
    const resetBoard = (resetScores: boolean) => {
        if (resetScores && !isGameAgainstComputer) {
            setPlayerOneScore(0);
            setPlayerTwoScore(0);
            setDraws(0);
            saveCurrentGame(null);
        } else {
            setBoard(INITIAL_BOARD);
        }

        setCurrentPlayer("X");
        setWinner("");
        setIsComputerTurn(false);
        saveBoard([]);
        saveLastShots([]);
        setLastShots([]);
    }

    /**
     * Reset the board and the scores and save the current game
     * If the game is against the computer, the computer turn is reset and the current player is saved (for the scoreboard)
     */
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
        setBoard(INITIAL_BOARD);
        saveBoard([]);
        saveLastShots([]);
        setLastShots([]);
    }

    /**
     * Return if the game has launched
     * @returns boolean - If the game has launched
     */
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
        isGame3Shots,
        setIsGame3Shots,
        hasGameLaunched
    };

    return <GameContext.Provider value = {value}>{children}</GameContext.Provider>;
};