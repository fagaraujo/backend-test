/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */

import { Action } from "redux";
import { Gender, InventoryItem, Survivor, SurvivorID, Trade, SurvivorLocation } from "./Types";

export const ACTION_ADDMEMBER = 'ADD_MEMBER';
export const ACTION_MARKINFECTED = 'MARK_INFECTED';
export const ACTION_TRADE = 'TRADE';
export const ACTION_UPDATELOCATION = 'UPDATE_LOCATION';

export interface ActionAddMember extends Action, Survivor { }
export interface ActionMarkInfected extends Action, SurvivorID { }
export interface ActionTrade extends Action, Trade { }
export interface ActionUpdateLocation extends Action, SurvivorLocation { }
export function AddMember(member: Survivor): ActionAddMember {
    return {
        type: ACTION_ADDMEMBER,
        ...member
    }
}
export function MarkInfected(id: SurvivorID): ActionMarkInfected {
    return {
        type: ACTION_MARKINFECTED,
        ...id
    }
}
export function TradeSingle(trade: Trade): ActionTrade {
    return {
        type: ACTION_TRADE,
        ...trade
    }
}
export function UpdateLocation(location: SurvivorLocation): ActionUpdateLocation {
    return {
        type: ACTION_UPDATELOCATION,
        ...location
    }
}
export type ZAction = ActionAddMember | ActionMarkInfected | ActionTrade | ActionUpdateLocation;

