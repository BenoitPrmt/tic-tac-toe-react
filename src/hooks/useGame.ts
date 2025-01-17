import {useContext} from "react";
import {GameContext} from "../context/GameContext.tsx";
import {GameContextType} from "../types/context/GameContext.ts";

export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};