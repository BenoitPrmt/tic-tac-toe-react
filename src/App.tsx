import {Route, Routes} from "react-router";
import Header from "./components/Header.tsx";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/Layout.tsx";
import GamePage from "./pages/GamePage.tsx";
import Footer from "./components/Footer.tsx";
import ScoreboardPage from "./pages/ScoreboardPage.tsx";

function App() {
    return (
        <>
            <Layout>
                <Header />
                <main className="mb-auto">
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/game" element={<GamePage />}/>
                        <Route path="/scoreboard" element={<ScoreboardPage />}/>
                    </Routes>
                </main>
                <Footer />
            </Layout>
        </>
    )
}

export default App
