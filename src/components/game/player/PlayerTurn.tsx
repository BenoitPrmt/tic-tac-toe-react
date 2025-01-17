import cross from "../../../assets/images/game/cross.svg";
import circle from "../../../assets/images/game/circle.svg";
import {useGame} from "../../../hooks/useGame.ts";

const PlayerTurn = () => {
    const { currentPlayer } = useGame();
    return (
        <div className={"bg-grey-medium rounded-lg shadow-[0px_7px_0px_0px_#132C36] px-4"}>
            <p className="font-bold flex flex-row text-grey-light text-2xl items-center">
                Tour de {currentPlayer === "X" ? (
                <img src={cross} alt={currentPlayer} className={"p-2 w-10 h-10 text-grey-light"}/>
            ) : (
                <img src={circle} alt={currentPlayer} className={"p-2 w-10 h-10 text-grey-light"}/>
            )}
            </p>
        </div>
    );
};

export default PlayerTurn;