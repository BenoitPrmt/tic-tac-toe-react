import {useContext} from "react";
import {PersistanceContextType} from "../types/context/PersistanceContext.ts";
import {PersistanceContext} from "../context/PersistanceContext.tsx";

export const usePersistance = (): PersistanceContextType => {
    const context = useContext(PersistanceContext);
    if (!context) {
        throw new Error('usePersistance must be used within a PersistanceProvider');
    }
    return context;
};