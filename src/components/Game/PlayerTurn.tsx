import {PlayerType} from "../../types/Board.ts";
import cross from "../../assets/images/game/cross.svg";
import circle from "../../assets/images/game/circle.svg";

type Props = {
    player: PlayerType;
}

const PlayerTurn = ({player}: Props) => {
    return (
        <div className={"bg-grey-medium rounded-lg shadow-[0px_7px_0px_0px_#132C36] px-4"}>
            <p className="font-bold flex flex-row text-grey-light text-2xl items-center">
                Tour de {player === "X" ? (
                <img src={cross} alt={player} className={"p-2 w-10 h-10 text-grey-light"}/>
            ) : (
                <img src={circle} alt={player} className={"p-2 w-10 h-10 text-grey-light"}/>
            )}
            </p>
        </div>
    );
};

export default PlayerTurn;