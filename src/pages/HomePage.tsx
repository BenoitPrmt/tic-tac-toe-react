import {SyntheticEvent, useState} from "react";
import Button from "../components/Button.tsx";
import Input from "../components/Input.tsx";
import Switch from "../components/Switch.tsx";
import {useNavigate} from "react-router";
import {useGame} from "../context/GameContext.tsx";
import {usePersistance} from "../context/PersistanceContext.tsx";

const HomePage = () => {
    const [isGameModeMulti, setGameModeMulti] = useState<boolean>(false);
    const [pOneUsername, setPOneUsername] = useState<string>("");
    const [isSubmitted, setSubmitted] = useState<boolean>(false);
    const navigate = useNavigate();

    const { setPlayerOneUsername, setPlayerTwoUsername, setIsGameAgainstComputer, resetBoard } = useGame();
    const { saveCurrentGame } = usePersistance();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const target = e.target as typeof e.target & {
            player_one: { value: string };
            player_two: { value: string };
        };

        setPOneUsername(target.player_one.value);
        if(target.player_one.value === "" && !isGameModeMulti) return;

        const pOne = target.player_one.value !== "" ? target.player_one.value : "Joueur 1";
        setPlayerOneUsername(pOne);
        const pTwo = isGameModeMulti ? (target.player_two.value !== "" ? target.player_two.value : "Joueur 2") : "CPU";
        setPlayerTwoUsername(pTwo);

        setIsGameAgainstComputer(!isGameModeMulti);

        saveCurrentGame({
            playerOne: pOne,
            playerOneScore: 0,
            playerTwo: pTwo,
            playerTwoScore: 0,
            draws: 0,
            againstComputer: !isGameModeMulti,
            isXTurn: true
        });

        resetBoard(true);

        navigate("/game");
    }

    const handleGameModeChange = (isChecked: boolean) => {
        setGameModeMulti(isChecked);
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold text-grey-light">
                TicTacToe
            </h1>

            <div className="space-y-5 flex flex-col justify-center items-center">
                <div className="">
                    <Switch handleChecked={handleGameModeChange} />
                </div>

                <form method="post" onSubmit={handleSubmit} className={"bg-grey-medium-shadow p-5 rounded-lg w-1/2"}>
                    <div className={"flex flex-col justify-center space-y-4"}>
                        <Input name={'player_one'} placeholder={"Joueur 1"} hasError={!isGameModeMulti && isSubmitted && pOneUsername === ""} />
                        {isGameModeMulti && (<Input name={'player_two'} placeholder={"Joueur 2"} />)}
                        <Button color={"secondary"} type="submit">Lancer la partie</Button>
                    </div>
                </form>
            </div>
        </div>
);
};

export default HomePage;