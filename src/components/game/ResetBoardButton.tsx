import {RotateCwIcon} from "lucide-react";
import Button from "../Button.tsx";
import {useGame} from "../../hooks/useGame.ts";

const ResetBoardButton = () => {
    const { resetAndSave } = useGame();

    return (
        <Button color={"greyLight"} onClick={() => resetAndSave()}>
            <RotateCwIcon strokeWidth={3} />
        </Button>
    );
};

export default ResetBoardButton;