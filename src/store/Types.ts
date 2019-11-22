/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */


export type Gender = 'male' | 'female' | 'others';
export type InventoryType = 'water' | 'food' | 'medicine' | 'ammunition';
//export enum InventoryType {'water' , 'food' , 'medicine' , 'ammunition'};
export const InventoryTypeList = ['water' , 'food' , 'medicine' , 'ammunition'];
export const TradePoints = {
    'water': 4,
    'food': 3,
    'medicine': 2,
    'ammunition': 1,
};
/**
 * Recursos dos Sobreviventes
 */
export interface SurvivorResources {
    water: number;
    food: number;
    medicine: number;
    ammunition: number;
}
/**
 * Informacoes de um Sobrevivente
 */
export interface Survivor {
    /**
     * uniqueID gerado automaticamente
     */
    uniqueID: number;
    name: string;
    age: number;
    gender: Gender;
    location: Location;
    //resources: InventoryItem[];
    resources: SurvivorResources;
    // para protecao dos sobreviventes as informacoes de infeccao foram separadas do seu cadastro base
    // infected: boolean;
    // reportsInfected: number;
}
/**
 * Identificacao de um Sobrevivente: **name** tem precendencia sobre o **id**
 */
export interface SurvivorID {
    uniqueID?: number;
    name?: string;
}
/**
 * Informacoes de localizacao
 */
export interface Location {
    latitude: number;
    longitude: number;
}
/**
 * Alteracao de localizacao de um Sobrevivente
 */
export interface SurvivorLocation {
    /**
     * Identificacao do Sobrevivente
     */
    id: SurvivorID;
    /**
     * Localizacao do Sobrevivente
     */
    location: Location;
}

/**
 * Item do inventario de recursos do Sobrevivente
 */
export interface InventoryItem {
    type: InventoryType;
    count: number;
}
/**
 * Informacoes para realizacao de Trocas entre os Sobreviventes
 */
export interface Trade {
    /**
     * Sobrevivente 1
     */
    survivor1: SurvivorID;
    //tradeItems1: InventoryItem[];
    /**
     * Itens que o Sobrevivente 1 deseja Trocar
     */
    tradeItems1: SurvivorResources;
    /**
     * Sobrevivente 2
     */
    survivor2: SurvivorID;
    //tradeItems2: InventoryItem[];
    /**
     * Itens que o Sobrevivente 2 deseja Trocar
     */
    tradeItems2: SurvivorResources;
}
/**
 * Status de infeccao do Sobrevivente
 */
export interface InfectionStatus {
    [uniqueID: number]: {
        infected: boolean;
        reports: number;
    }
}
/**
 * Estado geral da interface de Sobreviventes
 */
export interface ZState {
    /**
     * Populacao de sobreviventes
     */
    population: Survivor[];
    /**
     * Informacoes de infeccoes dos sobreviventes
     */
    infections: InfectionStatus;
}


/**
 * Informacoes gerais de infeccao da populacao
 */
export interface ReportInfection {
    /**
     * Estatisticas dos infectados
     */
    infected: string;
    /**
     * Estatisticas dos nao infectados
     */
    noninfected: string;
}

/**
 * Pontos perdidos devido a infeccoes
 */
 export interface ReportLostPoints {
     /**
      * Total de pontos
      */
     total: number;
     /**
      * Pontos por sobrevivente
      */
     survivors: {
         [Name: string]: number;
     }
 }