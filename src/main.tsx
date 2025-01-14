import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {GameProvider} from "./context/GameContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GameProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </GameProvider>
    </StrictMode>,
)
