import { useGame } from "../../context/GameContext";
import BoardComponent from "./Board";
import PlayerTurn from "./PlayerTurn";
import WinnerModal from "../WinnerModal";

const GameComponent = () => {
    const { winner } = useGame();

    return (
        <>
            <div className="flex justify-center">
                <PlayerTurn />
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