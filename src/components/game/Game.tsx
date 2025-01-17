import { useGame } from "../../hooks/useGame";
import PlayerTurn from "./player/PlayerTurn.tsx";
import WinnerModal from "./winner/WinnerModal.tsx";
import Button from "../Button.tsx";
import {RotateCwIcon} from "lucide-react";
import Logo from "../assets/Logo.tsx";
import BoardComponent from "./board/Board.tsx";

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