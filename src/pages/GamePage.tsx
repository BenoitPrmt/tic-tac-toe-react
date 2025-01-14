import ScoreCell from "../components/Game/ScoreCell.tsx";
import GameComponent from "../components/Game/Game.tsx";
import {useGame} from "../context/GameContext.tsx";

const GamePage = () => {
    const { playerOneUsername, playerTwoUsername, draws, playerOneScore, playerTwoScore } = useGame();

    return (
        <div>
            <GameComponent />

            <div className="flex justify-center mt-5">
                <div className="grid grid-cols-3 gap-4">
                    <ScoreCell color={"primary"} title={playerOneUsername} score={playerOneScore}/>
                    <ScoreCell color={"greyLight"} title={"Egalité"} score={draws}/>
                    <ScoreCell color={"secondary"} title={playerTwoUsername} score={playerTwoScore}/>
                </div>
            </div>
        </div>
    );
};

export default GamePage;