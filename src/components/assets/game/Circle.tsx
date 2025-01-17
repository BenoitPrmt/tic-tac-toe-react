import {COLOR_FILL} from "../../../constants/colors.ts";

type Props = {
    color?: "primary" | "secondary" | "greyLight" | "greyDark";
    className?: string;
}

const Circle = ({ color = "secondary", className="" }: Props) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 48 48"
            version="1.1"
            style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                strokeLinejoin: "round",
                strokeMiterlimit: 2
            }}
            className={className}
        >
            <path
                d="M24,0C37.246,0 48,10.754 48,24C48,37.246 37.246,48 24,48C10.754,48 0,37.246 0,24C0,10.754 10.754,0 24,0ZM24,9.54C31.981,9.54 38.46,16.019 38.46,24C38.46,31.981 31.981,38.46 24,38.46C16.019,38.46 9.54,31.981 9.54,24C9.54,16.019 16.019,9.54 24,9.54Z"
                className={`${COLOR_FILL[color]}`}
            />
        </svg>
    );
};

export default Circle;