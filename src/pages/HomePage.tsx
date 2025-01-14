import circle from '../assets/images/game/circle.svg'
import cross from '../assets/images/game/cross.svg'
import {SyntheticEvent, useState} from "react";
import Button from "../components/Button.tsx";
import Input from "../components/Input.tsx";
import Switch from "../components/Switch.tsx";
import {useNavigate} from "react-router";
import {useGame} from "../context/GameContext.tsx";

const HomePage = () => {
    const [isGameModeMulti, setGameModeMulti] = useState<boolean>(false);
    const [isSubmitted, setSubmitted] = useState<boolean>(false);
    const navigate = useNavigate();

    const { playerOneUsername, setPlayerOneUsername, playerTwoUsername, setPlayerTwoUsername, setIsGameAgainstComputer, resetBoard } = useGame();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const target = e.target as typeof e.target & {
            player_one: { value: string };
            player_two: { value: string };
        };
        const pOne = target.player_one.value;
        setPlayerOneUsername(pOne);
        const pTwo = isGameModeMulti ? target.player_two.value : "CPU";
        setPlayerTwoUsername(pTwo);

        if(pOne === "" || pTwo === "") return;

        setIsGameAgainstComputer(!isGameModeMulti);

        console.log(playerOneUsername, playerTwoUsername, isGameModeMulti);
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

            <img src={circle} alt={"Circle"} className={"w-10 h-10"}/>
            <img src={cross} alt={"Cross"} className={"w-10 h-10"}/>

            <div className="space-y-5 flex flex-col justify-center items-center">
                <div className="">
                    <Switch handleChecked={handleGameModeChange} />
                </div>

                <form method="post" onSubmit={handleSubmit} className={"bg-grey-medium-shadow p-5 rounded-lg w-1/2"}>
                    <div className={"flex flex-col justify-center space-y-4"}>
                        <Input name={'player_one'} placeholder={"Joueur 1"} hasError={isSubmitted && playerOneUsername === ""} />
                        {isGameModeMulti && (<Input name={'player_two'} placeholder={"Joueur 2"} hasError={isGameModeMulti && isSubmitted && playerTwoUsername === ""} />)}
                        <Button color={"secondary"} type="submit">Lancer la partie</Button>
                    </div>
                </form>
            </div>
        </div>
);
};

export default HomePage;