/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */

import { Store } from "./Store";
import { Survivor, SurvivorID, ZState, InventoryType, TradePoints, InventoryItem, SurvivorResources, InventoryTypeList } from "./Types";

export function SurvivorExist(id: SurvivorID, state?: ZState): boolean {
    let s: ZState = state ? state : Store.getState();

    for(let p of s.population) {
        if (((id.name) && (p.name == id.name)) || ((id.uniqueID) && (p.uniqueID == id.uniqueID))) {
            return true;
        }
    }
    return false;
}

export function SurvivorId(id: SurvivorID, state?: ZState): number|string {
    let s: ZState = state ? state : Store.getState();
    
    for(let p of s.population) {
        if ((id.name) && (p.name == id.name)) {
            return p.uniqueID;
        }
        if ((id.uniqueID) && (p.uniqueID == id.uniqueID)) {
            return p.name;
        }
    }
    return 0;
}

export function SurvivorId2(id: SurvivorID, state?: ZState): number {
    let s: ZState = state ? state : Store.getState();
    
    for(let p of s.population) {
        if ((id.name) && (p.name == id.name)) {
            return p.uniqueID;
        }
        if ((id.uniqueID) && (p.uniqueID == id.uniqueID)) {
            return p.uniqueID;
        }
    }
    return 0;
}

export function SurvivorById(id: SurvivorID, state?: ZState): Survivor|null {
    let s: ZState = state ? state : Store.getState();

    for(let p of s.population) {
        if (((id.name) && (p.name == id.name)) || ((id.uniqueID) && (p.uniqueID == id.uniqueID))) {
            return p;
        }
    }
    return null;
}

export function SurvivorInfected(id: SurvivorID, state?: ZState): boolean {
    let s: ZState = state ? state : Store.getState();

    for(let p of s.population) {
        if (((id.name) && (p.name == id.name)) || ((id.uniqueID) && (p.uniqueID == id.uniqueID))) {
            return s.infections[p.uniqueID].infected;
        }
    }
    return false;
}

export function PointsTrade(trade: SurvivorResources): number {
    let tr: any = trade;
    let pt: any = TradePoints;
    let r: number = 0;

    for(let t of InventoryTypeList) {
        if (tr[t]) {
            r += tr[t] * pt[t]; 
        }
    }
    return r;
}

export function SurvivorHasResourcesToTrade(id: SurvivorID, trade: SurvivorResources): boolean {
    let surv: Survivor|null = SurvivorById(id);

    if (surv == null)
        return false;
    else {
        let tr: any = trade;
        let res: any = surv.resources;
    
        for(let t of InventoryTypeList) {
            if ((res[t]) && (tr[t]) && (res[t] < tr[t])) {
                return false;
            }
        }
        return true;
    }
   
}

export function SurvivorToString(S: Survivor, state?: ZState) {
    let st: ZState = state ? state : Store.getState();
    return `{ age: ${S.age} gender: ${S.gender} lat: ${S.location.latitude} lon: ${S.location.longitude} infectReport: ${st.infections[S.uniqueID].reports} }`;
}