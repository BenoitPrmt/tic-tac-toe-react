import {ColorType} from "../../types/Colors.ts";

type Props = {
    color: ColorType;
    title: string;
    score: number;
}

const ScoreCell = ({ color, title, score }: Props) => {
    const colorVariants = {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        greyLight: 'bg-grey-light',
    }

    return (
        <div className={`${colorVariants[color]} rounded-lg h-auto w-[10vh] flex items-center flex-col`}>
            <p>{title}</p>
            <p className={"text-3xl font-semibold"}>{score}</p>
        </div>
    );
};

export default ScoreCell;