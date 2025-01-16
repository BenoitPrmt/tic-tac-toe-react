import {PlayerScoreType} from "../../types/Player.ts";
import {GAMEMODES} from "../../constants/Gamemode.ts";
import {ColorType} from "../../types/Colors.ts";
import Tile from "../Tile.tsx";

type Props = {
    item: PlayerScoreType,
    rank: number
}

const ScoreboardLine = ({ item, rank }: Props) => {
    let scoreboardColor: ColorType;

    switch (rank) {
        case 1:
            scoreboardColor = "secondary"
            break;
        case 2:
            scoreboardColor = "primary"
            break;
        case 3:
            scoreboardColor = "greyLight"
            break;
        default:
            scoreboardColor = "dark"
            break;
    }

    return (
        <tr className={"text-grey-light"}>
            <td className={"p-4"}>
                <Tile color={scoreboardColor}>{rank}</Tile>
            </td>
            <td className={"p-4"}>{item.username}</td>
            <td className={"p-4"}>{item.score}</td>
            <td className={"p-4"}>{GAMEMODES[item.gamemode]}</td>
            <td className={"p-4 hidden md:block"}>{item.timestamp.toLocaleString()}</td>
        </tr>
    );
};

export default ScoreboardLine;