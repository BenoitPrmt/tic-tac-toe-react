import {Route, Routes} from "react-router";
import Header from "./components/Header.tsx";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/Layout.tsx";
import GamePage from "./pages/GamePage.tsx";

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
            </Layout>
        </>
    )
}

export default App
