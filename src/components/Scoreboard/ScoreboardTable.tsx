import {PlayerLeaderboardType} from "../../types/Player.ts";
import ScoreboardLine from "./ScoreboardLine.tsx";
import {usePersistance} from "../../context/PersistanceContext.tsx";

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
                {scoreboard.map((item: PlayerLeaderboardType, index: number) => <ScoreboardLine item={item} key={index} />)}
            </tbody>
        </table>
    );
};

export default ScoreboardTable;