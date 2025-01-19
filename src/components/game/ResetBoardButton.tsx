import {RotateCwIcon} from "lucide-react";
import Button from "../Button.tsx";
import {useGame} from "../../hooks/useGame.ts";
import {memo} from "react";

const ResetBoardButton = memo(() => {
    const { resetAndSave } = useGame();

    return (
        <Button color={"greyLight"} onClick={() => resetAndSave()}>
            <RotateCwIcon strokeWidth={3} />
        </Button>
    );
});

export default ResetBoardButton;