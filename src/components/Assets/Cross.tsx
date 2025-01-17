import {COLOR_FILL} from "../../constants/Colors.ts";

type Props = {
    color?: "primary" | "secondary" | "greyLight" | "greyDark";
    className?: string;
}

const Cross = ({ color = "primary", className="" }: Props) => {
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
                d="M17.828,22.713L6.001,10.886C5.221,10.105 5.221,8.838 6.001,8.058L8.42,5.639C9.201,4.858 10.468,4.858 11.249,5.639L23.076,17.465C23.686,18.076 24.677,18.076 25.287,17.465L37.114,5.639C37.895,4.858 39.162,4.858 39.942,5.639L42.361,8.058C43.142,8.838 43.142,10.105 42.361,10.886L30.535,22.713C29.924,23.323 29.924,24.314 30.535,24.924L42.361,36.751C43.142,37.532 43.142,38.799 42.361,39.58L39.942,41.999C39.162,42.779 37.895,42.779 37.114,41.999L25.287,30.172C24.677,29.562 23.686,29.562 23.076,30.172L11.249,41.999C10.468,42.779 9.201,42.779 8.42,41.999L6.001,39.58C5.221,38.799 5.221,37.532 6.001,36.751L17.828,24.924C18.438,24.314 18.438,23.323 17.828,22.713Z"
                className={`${COLOR_FILL[color]}`}
            />
        </svg>
    );
};

export default Cross;