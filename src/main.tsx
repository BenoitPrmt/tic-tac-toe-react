import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {GameProvider} from "./provider/GameProvider.tsx";
import {PersistanceProvider} from "./provider/PersistanceProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PersistanceProvider>
            <GameProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </GameProvider>
        </PersistanceProvider>
    </StrictMode>,
)
