/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */

import redux, { createStore, Reducer, Action } from "redux";
import { reducer } from "./Reducers";

export var UniqID: number = 1;
export const GetNewID = () => {
    return UniqID++;
}
export var Store = createStore(reducer);