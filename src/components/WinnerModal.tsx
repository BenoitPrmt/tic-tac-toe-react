import {useEffect, useRef} from "react";
import {WinnerType} from "../types/Board.ts";
import cross from "../assets/images/game/cross.svg";
import circle from "../assets/images/game/circle.svg";
import Button from "./Button.tsx";

type Props = {
    title: string;
    visible: boolean;
    winner: WinnerType;
    onClose?: () => void;
    onRestart?: () => void;
}

const WinnerModal = ({title, visible, winner, onClose, onRestart}: Props) => {
    const modalRef = useRef(null);

    const winnerColors = {
        X: "text-primary",
        O: "text-secondary",
        D: "text-light-grey",
    };

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }
        visible ? modalRef.current.showModal() : modalRef.current.close();
    }, [visible]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    const handleESC = (event) => {
        event.preventDefault();
        handleClose();
    }

    return (
        <dialog ref={modalRef} id="my_modal_4" className="modal" onCancel={handleESC}>
            <div className="modal-box w-[100vw] max-w-5xl rounded-none bg-grey-dark flex items-center flex-col">
                <p className="py-4 text-grey-light font-bold">{title.toUpperCase()}</p>
                <h3 className={`font-bold flex flex-row text-grey-light text-3xl justify-center ${winnerColors[winner]}`}>
                    {["X", "O"].includes(winner) ?
                        <img src={winner === "X" ? cross : circle} alt={winner} className={"p-2 w-10 h-10 text-grey-light"}/>
                        : ""
                    }
                    {winner === "D" ? "Egalité" : " a gagné ce round !"}
                </h3>
                <div className="modal-action flex justify-center">
                    <form method="dialog" className="space-x-2">
                        <Button onClick={handleClose} color={"greyLight"}>Quitter</Button>
                        <Button onClick={onRestart} color={"secondary"}>Nouvelle partie</Button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default WinnerModal;