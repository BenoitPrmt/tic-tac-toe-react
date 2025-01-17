import {PlayerLeaderboardType} from "../../types/Player.ts";
import {GAMEMODES} from "../../constants/gamemode.ts";
import {ColorType} from "../../types/Colors.ts";
import Tile from "../Tile.tsx";
import {formatDate} from "../../utils/formatDate.ts";
import {memo} from "react";

type Props = {
    item: PlayerLeaderboardType;
}

const ScoreboardLine = memo(({ item }: Props) => {
    let scoreboardColor: ColorType;

    switch (item.rank) {
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
                <Tile color={scoreboardColor}>{item.rank}</Tile>
            </td>
            <td className={"p-4"}>{item.username}</td>
            <td className={"p-4"}>{item.score}</td>
            <td className={"p-4"}>{GAMEMODES[item.gamemode]}</td>
            <td className={"p-4 hidden md:block"}>{formatDate(item.timestamp)}</td>
        </tr>
    );
});

export default ScoreboardLine;