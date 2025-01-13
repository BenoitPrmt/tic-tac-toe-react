import {ColorType} from "../../types/Colors.ts";
import {COLOR_BACKGROUND} from "../../constants/Colors.ts";

type Props = {
    color: ColorType;
    title: string;
    score: number;
}

const ScoreCell = ({ color, title, score }: Props) => {
    return (
        <div className={`${COLOR_BACKGROUND[color]} rounded-lg h-auto w-[10vh] flex items-center flex-col`}>
            <p>{title}</p>
            <p className={"text-3xl font-semibold"}>{score}</p>
        </div>
    );
};

export default ScoreCell;