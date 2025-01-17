import ScoreCell from "../components/Game/ScoreCell.tsx";
import GameComponent from "../components/Game/Game.tsx";
import { useGame } from "../hooks/useGame";

const GamePage = () => {
    const { playerOneUsername, playerTwoUsername, draws, playerOneScore, playerTwoScore, isGame3Shots } = useGame();

    return (
        <div>
            <GameComponent />

            <div className="flex justify-center mt-5">
                <div className={`grid gap-4 ${isGame3Shots ? "grid-cols-2" : "grid-cols-3"}`}>
                    <ScoreCell color={"primary"} title={playerOneUsername} score={playerOneScore}/>
                    {!isGame3Shots && <ScoreCell color={"greyLight"} title={"Egalité"} score={draws}/>}
                    <ScoreCell color={"secondary"} title={playerTwoUsername} score={playerTwoScore}/>
                </div>
            </div>
        </div>
    );
};

export default GamePage;