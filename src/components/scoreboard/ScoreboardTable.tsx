import {PlayerLeaderboardType} from "../../types/Player.ts";
import ScoreboardLine from "./ScoreboardLine.tsx";
import {usePersistance} from "../../hooks/usePersistance";

const ScoreboardTable = () => {
    const { getLeaderboard } = usePersistance()

    const scoreboard: PlayerLeaderboardType[] = getLeaderboard();

    return (
        <table className={"max-w-2/3"}>
            <thead>
            <tr className={"text-grey-light text-xl font-bold"}>
                <th className={"p-2 md:p-4"}>#</th>
                <th className={"p-2 md:p-4"}>Joueur</th>
                <th className={"p-2 md:p-4"}>Score</th>
                <th className={"p-2 md:p-4"}>Mode de jeu</th>
                <th className={"hidden md:block p-2 md:p-4"}>Réalisé le</th>
            </tr>
            </thead>
            <tbody>
                {scoreboard.length > 0 ? (
                    scoreboard.map((item: PlayerLeaderboardType, index: number) => (
                        <ScoreboardLine key={index} item={item} />
                    ))
                ) : (
                    <tr className={"text-grey-light"}>
                        <td colSpan={5} className={"p-4 text-center"}>Aucun score enregistré pour le moment</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ScoreboardTable;