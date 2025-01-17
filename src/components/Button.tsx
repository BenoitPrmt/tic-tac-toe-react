import {ColorType} from "../types/Colors.ts";
import {memo, ReactNode} from "react";
import {COLOR_BACKGROUND, COLOR_HOVER, COLOR_SHADOW} from "../constants/Colors.ts";

type Props = {
    color: ColorType
    onClick?: (() => void) | undefined;
    children: ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
}

const Button = memo(({ color, onClick, children, type = 'button' }: Props) => {
    return (
        <button type={type} className={`text-grey-medium font-extrabold uppercase rounded-lg active:translate-y-1 active:shadow-none px-4 py-2 ${COLOR_BACKGROUND[color]} ${COLOR_HOVER[color]} ${COLOR_SHADOW[color]}`} onClick={onClick}>
            {children}
        </button>
    );
});

export default Button;