import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-grey-dark h-[100vh]">
            <div className={"container mx-auto"}>
                {children}
            </div>
        </div>
    );
};

export default Layout;