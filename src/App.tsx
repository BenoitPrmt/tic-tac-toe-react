import {Route, Routes} from "react-router";
import Header from "./components/Header.tsx";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/Layout.tsx";
import GamePage from "./pages/GamePage.tsx";
import Footer from "./components/Footer.tsx";

function App() {
    return (
        <>
            <Layout>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/game" element={<GamePage/>}/>
                    <Route path="/scoreboard" element={<HomePage/>}/>
                </Routes>
                <Footer />
            </Layout>
        </>
    )
}

export default App
