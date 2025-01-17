import {createContext} from 'react';
import {GameContextType} from "../types/context/GameContext.ts";

export const GameContext = createContext<GameContextType | undefined>(undefined);