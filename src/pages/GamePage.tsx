import BoardCell from "../components/Game/BoardCell.tsx";
import ScoreCell from "../components/Game/ScoreCell.tsx";

const GamePage = () => {
    return (
        <div>
            <div className="flex justify-center">
                <h1 className="text-3xl font-semibold">
                    C'est le tour de X
                </h1>
            </div>

            <div className="flex justify-center py-4">
                <div className="grid grid-cols-3 gap-4">
                    <BoardCell />
                    <BoardCell />
                    <BoardCell />

                    <BoardCell />
                    <BoardCell />
                    <BoardCell />

                    <BoardCell />
                    <BoardCell />
                    <BoardCell />
                </div>
            </div>

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