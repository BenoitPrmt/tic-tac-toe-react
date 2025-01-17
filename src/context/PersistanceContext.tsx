import {createContext} from 'react';
import {PersistanceContextType} from "../types/context/PersistanceContext.ts";

export const PersistanceContext = createContext<PersistanceContextType | undefined>(undefined);

