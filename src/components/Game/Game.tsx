import { useGame } from "../../hooks/useGame";
import BoardComponent from "./Board";
import PlayerTurn from "./PlayerTurn";
import WinnerModal from "../WinnerModal";
import Button from "../Button.tsx";
import {RotateCwIcon} from "lucide-react";
import Logo from "../Logo.tsx";

const GameComponent = () => {
    const { winner, resetAndSave } = useGame();

    return (
        <>
            <div className="flex justify-center space-x-4 mb-10">
                <Logo />
                <PlayerTurn />
                <Button color={"greyLight"}>
                    <RotateCwIcon strokeWidth={3} onClick={() => resetAndSave()} />
                </Button>
            </div>

            <BoardComponent />

            <WinnerModal
                title={"Victoire !"}
                visible={winner !== ""}
                winner={winner}
            />
        </>
    );
};

export default GameComponent;