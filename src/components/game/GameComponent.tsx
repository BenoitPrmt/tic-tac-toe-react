import { useGame } from "../../hooks/useGame";
import PlayerTurn from "./player/PlayerTurn.tsx";
import WinnerModal from "./winner/WinnerModal.tsx";
import Logo from "../assets/Logo.tsx";
import BoardComponent from "./board/Board.tsx";
import ResetBoardButton from "./ResetBoardButton.tsx";
import ScoreCell from "./score/ScoreCell.tsx";

const GameComponent = () => {
    const { winner, playerOneUsername, playerTwoUsername, draws, playerOneScore, playerTwoScore, isGame3Shots } = useGame();

    return (
        <>
            <div className="flex justify-center space-x-4 mb-10">
                <Logo/>
                <PlayerTurn/>
                <ResetBoardButton/>
            </div>

            <BoardComponent/>

            <WinnerModal
                title={"Victoire !"}
                visible={winner !== ""}
                winner={winner}
            />

            <div className="flex justify-center mt-5">
                <div className={`grid gap-4 ${isGame3Shots ? "grid-cols-2" : "grid-cols-3"}`}>
                    <ScoreCell color={"primary"} title={playerOneUsername} score={playerOneScore}/>
                    {!isGame3Shots && <ScoreCell color={"greyLight"} title={"Egalité"} score={draws}/>}
                    <ScoreCell color={"secondary"} title={playerTwoUsername} score={playerTwoScore}/>
                </div>
            </div>
        </>
    );
};

export default GameComponent;