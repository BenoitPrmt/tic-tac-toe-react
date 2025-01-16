import {PlayerScoreType} from "../../types/Player.ts";
import ScoreboardLine from "./ScoreboardLine.tsx";

const ScoreboardTable = () => {
    const scoreboard: PlayerScoreType[] = [
        {username: "Raph", score: 20, timestamp: new Date(120), gamemode: "normal"},
        {username: "Ben", score: 10, timestamp: new Date(234), gamemode: "threeShots"},
        {username: "Kilian", score: 30, timestamp: new Date(347), gamemode: "normal"},
        {username: "Matéo", score: 22, timestamp: new Date(238), gamemode: "threeShots"},
        {username: "Maxence", score: 20, timestamp: new Date(293), gamemode: "threeShots"},
        {username: "Maxence", score: 3, timestamp: new Date(843), gamemode: "normal"},
    ]
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
                {scoreboard.map((item: PlayerScoreType, index: number) => <ScoreboardLine item={item} rank={index + 1}/>)}
            </tbody>
        </table>
    );
};

export default ScoreboardTable;