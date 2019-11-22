/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */

import { Path, GET, POST } from "typescript-rest";
import { Tags, Produces } from "typescript-rest-swagger";
import { Store } from "../store/Store";
import { ZState, Survivor, ReportInfection, SurvivorResources, ReportLostPoints } from "../store/Types";
import { Survivors } from "./Survivors";
import { PointsTrade } from "../store/Functions";

/**
 * Relatorios e estatitiscas do modulo
 */
@Path("/reports")
@Tags("Relatorios / Estatisticas")
@Produces('application/json')
export class Reports {
    /**
     * Retorna a lista de Sobreviventes da populucao com todas as suas informacoes
     */
    @POST
    @Path("population")
    async getPopulation(): Promise<Survivor[]> {
        return Store.getState().population;
    }

    /**
     * Relatorio geral de infeccoes da populacao
     */
    @POST
    @Path("infections")

    async getInfections(): Promise<ReportInfection> {
        let S: ZState = Store.getState();
        let infected: number = 0;
        let noninfected: number = 0;
        let total: number = 0;
        for (let key in S.infections) {
            infected += S.infections[key].infected ? 1 : 0;
            noninfected += S.infections[key].infected ? 0 : 1;
        }
        total = infected+noninfected == 0 ? 1: infected+noninfected;
        return {
            infected: `${infected.toString()} ( ${(100.00 * infected / (total)).toFixed(2) }% ) `,
            noninfected: `${noninfected.toString()} ( ${(100.00 * noninfected / (total)).toFixed(2) }% ) `,
        }
    }

    /**
     * Relatorio geral de recursos da populacao
     */
    @POST
    @Path("resources")

    async getResources(): Promise<SurvivorResources> {
        let S: ZState = Store.getState();
        let P: Survivor;
        let infected: number = 0;
        let noninfected: number = 0;
        let total: number = 0;
        let R: SurvivorResources = {
            water: 0.00,
            food: 0.00,
            medicine: 0.00,
            ammunition: 0.00
        };
        for (let P of S.population) {
            R.water += P.resources.water / S.population.length;
            R.food += P.resources.food / S.population.length;
            R.medicine += P.resources.medicine / S.population.length;
            R.ammunition += P.resources.ammunition / S.population.length;
        }
        
        return R;
    }

    /**
     * Pontos perdidos de Sobreviventes infectados
     */
    @POST
    @Path("lostpoints")

    async getLostPoints(): Promise<ReportLostPoints> {
        let S: ZState = Store.getState();
        let P: Survivor;
        let R: ReportLostPoints = {
            total: 0,
            survivors: {}
        };
        
        for (let P of S.population) {
            if (S.infections[P.uniqueID].infected)
                R.total += (R.survivors[P.name] = PointsTrade(P.resources));
        }
        
        return R;
    }
}