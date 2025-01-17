import {BoardType} from "../Board.ts";
import {PlayerLeaderboardType, PlayerScoreType} from "../Player.ts";
import {CurrentGame, Shot} from "../Game.ts";

export interface PersistanceContextType {
    saveBoard: (board: BoardType) => void;
    getSavedBoard: () => BoardType;
    savePlayerScore: (playerScore: PlayerScoreType) => void;
    saveCurrentGame: (currentGame: CurrentGame | null) => void;
    getCurrentGame: () => CurrentGame | null;
    saveCurrentPlayer: (currentPlayer: PlayerScoreType | null) => void;
    getCurrentPlayer: () => PlayerScoreType | null;
    saveLastShots: (shots: Shot[]) => void;
    getLastShots: () => Shot[] | null;
    getLastShotsOfPlayer: (player: "X" | "O") => Shot[];
    getLeaderboard: () => PlayerLeaderboardType[];
}