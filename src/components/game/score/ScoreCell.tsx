import {ColorType} from "../../../types/Colors.ts";
import {COLOR_BACKGROUND} from "../../../constants/colors.ts";

type Props = {
    color: ColorType;
    title: string;
    score: number;
}

const ScoreCell = ({ color, title, score }: Props) => {
    return (
        <div className={`${COLOR_BACKGROUND[color]} rounded-lg h-auto min-w-[10vh] flex items-center flex-col`}>
            <p className={"text-grey-dark"}>{title}</p>
            <p className={"text-3xl font-semibold text-grey-dark"}>{score}</p>
        </div>
    );
};

export default ScoreCell;