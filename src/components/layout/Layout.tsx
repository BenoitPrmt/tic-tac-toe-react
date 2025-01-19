import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-grey-dark flex flex-col">
            <div className="container mx-auto flex-grow flex flex-col justify-between">
                {children}
            </div>
        </div>
    );
};

export default Layout;