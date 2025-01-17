import circle from "../../assets/images/game/circle.svg";
import cross from "../../assets/images/game/cross.svg";
import {memo} from "react";

const Logo = memo(() => {
    return (
        <div className={"flex flex-row space-x-2 items-center"}>
            <img src={cross} alt={"Cross"} className={"w-6 h-6"}/>
            <img src={circle} alt={"Circle"} className={"w-6 h-6"}/>
        </div>
    );
});

export default Logo;