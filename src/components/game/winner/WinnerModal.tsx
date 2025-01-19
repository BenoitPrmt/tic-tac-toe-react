import {SyntheticEvent, useEffect, useRef} from "react";
import {WinnerType} from "../../../types/Board.ts";
import cross from "../../../assets/images/game/cross.svg";
import circle from "../../../assets/images/game/circle.svg";
import Button from "../../Button.tsx";
import {WINNER_COLORS} from "../../../constants/colors.ts";
import { useGame } from "../../../hooks/useGame.ts";
import {useNavigate} from "react-router";

type Props = {
    title: string;
    visible: boolean;
    winner: WinnerType;
    onClose?: () => void;
}

const WinnerModal = ({title, visible, winner, onClose}: Props) => {
    const { resetBoard, resetAndSave } = useGame();
    const modalRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }

        if (visible) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    }, [resetBoard, visible]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        if (!modalRef.current) {
            return;
        }
        modalRef.current.close();
    }

    const handleQuitGame = () => {
        resetAndSave();
        handleClose();
        navigate("/");
    }

    const handleESC = (event: SyntheticEvent<HTMLDialogElement, Event>) => {
        event.preventDefault();
        handleClose();
    }

    const handleRestart = () => {
        resetBoard(false);
        handleClose();
    }

    return (
        <dialog ref={modalRef} id="my_modal_4" className="modal" onCancel={handleESC} role="dialog">
            <div className="modal-box w-[100vw] max-w-full rounded-none bg-grey-dark flex items-center flex-col">
                <p className="py-4 text-grey-light font-bold">{title.toUpperCase()}</p>
                <h3 className={`font-bold flex flex-row text-grey-light text-3xl justify-center ${WINNER_COLORS[winner]}`}>
                    {["X", "O"].includes(winner) ?
                        <img src={winner === "X" ? cross : circle} alt={winner} className={"p-2 w-10 h-10 text-grey-light"}/>
                        : ""
                    }
                    {winner === "D" ? "Egalité" : " a gagné ce round !"}
                </h3>
                <div className="modal-action flex justify-center">
                    <form method="dialog" className="space-x-2">
                        <Button onClick={handleQuitGame} color={"greyLight"}>Quitter</Button>
                        <Button onClick={handleRestart} color={"secondary"}>Nouvelle partie</Button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default WinnerModal;