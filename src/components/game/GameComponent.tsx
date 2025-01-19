import { useGame } from "../../hooks/useGame";
import PlayerTurn from "./player/PlayerTurn.tsx";
import WinnerModal from "./winner/WinnerModal.tsx";
import Logo from "../assets/Logo.tsx";
import BoardComponent from "./board/Board.tsx";
import ResetBoardButton from "./ResetBoardButton.tsx";

const GameComponent = () => {
    const { winner } = useGame();

    return (
        <>
            <div className="flex justify-center space-x-4 mb-10">
                <Logo />
                <PlayerTurn />
                <ResetBoardButton />
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