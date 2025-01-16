import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-grey-dark">
            <div className={"container mx-auto flex flex-col h-screen justify-between"}>
                {children}
            </div>
        </div>
    );
};

export default Layout;