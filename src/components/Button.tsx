import {ColorType} from "../types/Colors.ts";
import {ReactNode} from "react";
import {COLOR_BACKGROUND, COLOR_SHADOW} from "../constants/Colors.ts";

type Props = {
    color: ColorType
    onClick: (() => void) | undefined;
    children: ReactNode;
}

const Button = ({ color, onClick, children }: Props) => {
    return (
        <button className={`font-extrabold uppercase rounded-lg px-4 py-2 shad ${COLOR_BACKGROUND[color]} ${COLOR_SHADOW[color]}`} onClick={onClick}>{children}</button>
    );
};

export default Button;