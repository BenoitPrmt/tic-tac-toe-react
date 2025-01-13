import {Route, Routes} from "react-router";
import Header from "./components/Header.tsx";
import HomePage from "./pages/HomePage.tsx";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/scoreboard" element={<HomePage/>}/>
            </Routes>
        </>
    )
}

export default App
