/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */

import { Reducer } from "redux";
import { ZState, Survivor, InventoryType, InventoryTypeList } from "./Types";
import { initialState } from "./Initial";
import { ZAction, ACTION_ADDMEMBER, AddMember, ACTION_MARKINFECTED, ActionMarkInfected, ActionTrade, ACTION_TRADE, ACTION_UPDATELOCATION, ActionUpdateLocation } from "./Actions";
import { Survivors } from "../controllers/Survivors";
import { GetNewID } from "./Store";
import { SurvivorId, SurvivorById, SurvivorId2 } from "./Functions";


export const reducer: Reducer<ZState, ZAction> = (state: ZState = initialState, action: ZAction): ZState  =>  {
    switch (action.type) {
        case ACTION_ADDMEMBER: {
            let S: any = (action);
            delete S['type'];
            let uniqueID = GetNewID();
            return {
                population: [ ...state.population, { ...S, uniqueID } ],
                infections: { ...state.infections, [uniqueID]: {infected: false, reports: 0 } }
            }
        }
        case ACTION_MARKINFECTED: {
            let survid: number = SurvivorId2((action as ActionMarkInfected), state);
            let surv: Survivor|null = SurvivorById((action as ActionMarkInfected), state);

            if ((survid <= 0) || (surv == null))
                return state;
            else if (state.infections[survid].infected)
                return state;
            else
                return {
                    population: [ ...state.population ],
                    infections: { ...state.infections, [survid]: {
                            infected: state.infections[survid].reports >= 2 ? true : false, 
                            reports: state.infections[survid].reports >= 2 ? 0 : state.infections[survid].reports+1 
                        } 
                    }
                }
        }
        case ACTION_TRADE: {
            let trade: ActionTrade = (action as ActionTrade);
            let S: any = state.population.map((value, index) => {
                if (((trade.survivor1.name) && (value.name == trade.survivor1.name)) || ((trade.survivor1.uniqueID) && (value.uniqueID == trade.survivor1.uniqueID))) {
                    let res: any = value.resources;
                    let tr1: any = trade.tradeItems1;
                    let tr2: any = trade.tradeItems2;
                    for(let t of InventoryTypeList) {
                        res[t] += (tr2[t] ? tr2[t] : 0) - (tr1[t] ? tr1[t] : 0);
                    }
                    value.resources = res;
                }
                else if (((trade.survivor2.name) && (value.name == trade.survivor2.name)) || ((trade.survivor2.uniqueID) && (value.uniqueID == trade.survivor2.uniqueID))) {
                    let res: any = value.resources;
                    let tr1: any = trade.tradeItems1;
                    let tr2: any = trade.tradeItems2;
                    for(let t of InventoryTypeList) {
                        res[t] += (tr1[t] ? tr1[t] : 0) - (tr2[t] ? tr2[t] : 0);
                    }
                    value.resources = res;
                }
                return value;
            });
            return {
                population: [...S],
                infections: {...state.infections}
            }
        }
        case ACTION_UPDATELOCATION: {
            let update: ActionUpdateLocation = (action as ActionUpdateLocation);
            let S: any = state.population.map((value, index) => {
                if (((update.id.name) && (value.name == update.id.name)) || ((update.id.uniqueID) && (value.uniqueID == update.id.uniqueID))) {
                    value.location = {...update.location};
                }
                return value;
            });
            return {
                population: [...S],
                infections: {...state.infections}
            }

        }
        default:
            return state;
    }
}
