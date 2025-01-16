import Logo from "./Logo.tsx";
import Button from "./Button.tsx";
import {Link} from "react-router";
import {useGame} from "../context/GameContext.tsx";

const Header = () => {
    const { hasGameLaunched } = useGame();

    return (
        <header>
            <nav className={"flex flex-row justify-between py-5 px-4"}>
                <div className="flex flex-row space-y-3">
                    <Link to={"/"}>
                        <Logo />
                    </Link>
                </div>
                <div className="flex flex-row space-x-3">
                    {hasGameLaunched() && (
                        <Button color={"greyLight"}>
                            <Link to={"/game"}>
                                Jeu
                            </Link>
                        </Button>
                    )}
                    <Button color={"greyLight"}>
                        <Link to={"/ranking"}>
                            Classement
                        </Link>
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Header;