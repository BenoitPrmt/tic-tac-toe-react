import {ColorType} from "../types/Colors.ts";
import {ReactNode} from "react";
import {COLOR_BACKGROUND, COLOR_HOVER, COLOR_SHADOW} from "../constants/colors.ts";

type Props = {
    color: ColorType
    children: ReactNode;
}

const Tile = ({ color, children }: Props) => {
    return (
        <span className={`${color === "dark" ? "text-grey-light" : "text-grey-medium"} font-extrabold uppercase rounded-lg active:translate-y-1 px-4 py-2 ${COLOR_BACKGROUND[color]} ${COLOR_HOVER[color]} ${COLOR_SHADOW[color]}`}>
            {children}
        </span>
    );
};

export default Tile;