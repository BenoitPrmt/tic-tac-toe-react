import Logo from "./Logo.tsx";
import {Link} from "react-router";
import {GithubIcon} from "lucide-react";

const Footer = () => {
    return (
        <header>
            <nav className={"flex flex-row justify-between py-5 px-4"}>
                <div className="flex flex-row space-y-3">
                    <Link to={"/"}>
                        <Logo />
                    </Link>
                </div>
                <div>
                    <p className={"text-grey-light"}>TicTacToe - Made by ❤️ by <a href="https://benoit.fun" target="_blank" className="text-secondary">Benoît Parmentier</a></p>
                </div>
                <div className="flex flex-row space-x-3">
                    <a href={"https://github.com/BenoitPrmt"} target="_blank" className="text-grey-light">
                        <GithubIcon />
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Footer;