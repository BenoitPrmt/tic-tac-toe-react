import {SyntheticEvent, useState} from "react";
import Button from "../components/Button.tsx";
import Input from "../components/Input.tsx";
import Switch from "../components/Switch.tsx";
import {useNavigate} from "react-router";
import {useGame} from "../context/GameContext.tsx";
import {usePersistance} from "../context/PersistanceContext.tsx";
import {PlayerScoreType} from "../types/Player.ts";

const HomePage = () => {
    const [isGameMode3Shots, setGameMode3Shots] = useState<boolean>(false);
    const [isGameModeMulti, setGameModeMulti] = useState<boolean>(false);
    const [pOneUsername, setPOneUsername] = useState<string>("");
    const [isSubmitted, setSubmitted] = useState<boolean>(false);
    const navigate = useNavigate();

    const {
        setPlayerOneUsername,
        setPlayerTwoUsername,
        resetBoard,
        setPlayerOneScore,
        setPlayerTwoScore,
        setIsGameAgainstComputer,
        setIsGame3Shots
    } = useGame();
    const {saveCurrentGame, savePlayerScore, getCurrentPlayer, saveCurrentPlayer} = usePersistance();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const target = e.target as typeof e.target & {
            player_one: { value: string };
            player_two: { value: string };
        };

        setPOneUsername(target.player_one.value);
        if (target.player_one.value === "" && !isGameModeMulti) return;

        // TODO: Mettre tout ceci dans une fonction retournée par le context
        const pOne = target.player_one.value !== "" ? target.player_one.value : "Joueur 1";
        setPlayerOneUsername(pOne);
        setPlayerOneScore(0);
        const pTwo = isGameModeMulti ? (target.player_two.value !== "" ? target.player_two.value : "Joueur 2") : "CPU";
        setPlayerTwoUsername(pTwo);
        setPlayerTwoScore(0);

        setIsGameAgainstComputer(!isGameModeMulti);
        setIsGame3Shots(isGameMode3Shots);
        resetBoard(true);

        const currentPlayer: PlayerScoreType | null = getCurrentPlayer()
        if (currentPlayer) {
            savePlayerScore(currentPlayer);
            if (!isGameModeMulti) {
                saveCurrentPlayer({
                    username: pOne,
                    gamemode: isGameMode3Shots ? "threeShots" : "normal",
                    score: 0,
                    timestamp: new Date()
                });
            }
        }

        saveCurrentGame({
            playerOne: pOne,
            playerOneScore: 0,
            playerTwo: pTwo,
            playerTwoScore: 0,
            draws: 0,
            againstComputer: !isGameModeMulti,
            isGame3Shots: isGameMode3Shots,
            isXTurn: true
        });


        navigate("/game");
    }

    const handleGameModeChange = (isChecked: boolean) => {
        setGameModeMulti(isChecked);
    }

    const handleGameTypeChange = (is3ShotsSelected: boolean) => {
        setGameMode3Shots(is3ShotsSelected);
    }

    return (
        <div>
            <div className="space-y-5 flex flex-col justify-center items-center">
                <div className="">
                    <Switch handleChecked={handleGameTypeChange} choiceOne={"Mode classique"}
                            choiceTwo={"Mode en 3 coups"}/>
                </div>

                <div className="">
                    <Switch handleChecked={handleGameModeChange} choiceOne={"Contre l'ordinateur"}
                            choiceTwo={"Multijoueur"}/>
                </div>
                <div className="max-sm:mx-6 w-full">
                <form method="post" onSubmit={handleSubmit}
                      className={"bg-grey-medium-shadow p-5 rounded-lg w-full sm:w-1/2 md:w-1/3 mx-auto"}>
                    <div className={"flex flex-col justify-center space-y-4"}>
                        <Input name={'player_one'} placeholder={"Joueur 1"}
                               hasError={!isGameModeMulti && isSubmitted && pOneUsername === ""}/>
                        {isGameModeMulti && (<Input name={'player_two'} placeholder={"Joueur 2"}/>)}
                        <Button color={"secondary"} type="submit">Lancer la partie</Button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
};

export default HomePage;