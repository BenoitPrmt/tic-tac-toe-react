import Logo from "../assets/Logo.tsx";
import {Link} from "react-router";
import {GithubIcon, LinkedinIcon} from "lucide-react";
import {memo} from "react";

const Footer = memo(() => {
    return (
        <footer className={"flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:justify-between py-5 px-4"}>
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
                <a href={"https://linkedin.com/in/benoit-parmentier"} target="_blank" className="text-grey-light">
                    <LinkedinIcon />
                </a>
            </div>
        </footer>
    );
});

export default Footer;