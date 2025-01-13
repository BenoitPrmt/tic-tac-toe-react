import ScoreCell from "../components/Game/ScoreCell.tsx";
import GameComponent from "../components/Game/Game.tsx";

const GamePage = () => {
    return (
        <div>
            <GameComponent />

            <div className="flex justify-center mt-5">
                <div className="grid grid-cols-3 gap-4">
                    <ScoreCell color={"primary"} title={"Joueur 1"} score={10}/>
                    <ScoreCell color={"greyLight"} title={"Egalité"} score={3}/>
                    <ScoreCell color={"secondary"} title={"Joueur 2"} score={5}/>
                </div>
            </div>
        </div>
    );
};

export default GamePage;