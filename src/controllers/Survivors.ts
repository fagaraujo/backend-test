/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */

import {Produces, Tags} from "typescript-rest-swagger"
import {Path, Accept, POST, BodyType, ParserType} from "typescript-rest"
import { Store } from "../store/Store"
import { AddMember, MarkInfected, TradeSingle } from "../store/Actions"
import { Survivor, SurvivorID, Trade, SurvivorLocation } from "../store/Types"
import { SurvivorById, SurvivorId, SurvivorInfected, PointsTrade, SurvivorHasResourcesToTrade } from "../store/Functions"
import { resolve } from "dns"
import { BaseController } from "./BaseController"


export interface X {
    nome: number;
}
/**
 * Controller de Pessoas
 */
@Path("/survivor")
@Tags('Sobreviventes')
export class Survivors extends BaseController {

    /**
     * Adiciona um membro a populacao de Sobreviventes
     * @param member 
     *          Dados do sobrevivente para ser inserido na populacao
     */
    @Path("/add")
    @POST
    @Accept('application/json', 'application/xml')
    @Produces('application/json')
    async addSurvivor( member: Survivor ): Promise<any> {
        try {
            
            let id: number = (SurvivorId({name: member.name}) as number);
            
            if (id > 0)  {
                return this.success('Esse Sobrevivente ja faz parte da populacao', SurvivorById({name: member.name}));
            }
            else if (member.name.trim() == "") {
                return this.error('Deve ser informado o nome do Sobrevivente');    
            }
            else { 
                Store.dispatch(AddMember(member));
                return this.success('', member);
            }
        }
        catch(e) {
            return this.error(e.message, e);
        }
    }

    /**
     * Report um membro da populacao como Infectado
     * @param id
     * @type SurvivorID
     *          **ID** ou **Nome** do Sobrevivente 
     */
    @Path("reportInfection")
    @POST
    @Accept('application/json', 'application/xml')
    @Produces('application/json')
    async reportInfection(id: SurvivorID): Promise<any> {
        let S: Survivor|null = SurvivorById(id);
        if (S != null) {
            Store.dispatch(MarkInfected(id));
            let infect = Store.getState().infections[S.uniqueID];
            if (infect.infected) 
                return this.success('Sobrevivente foi marcado como infectado');
            else
            return this.success(`Ja foi(ram) reportado(s) ${infect.reports} infeccao(oes) para esse Sobrevivente`);
        }
        else {
            return this.error('Sobrevivente nao localizado');
        }
    }

    /**
     * Faz troca de itens do inventario entre 2 sobreviventes
     * @param trade @type Trade
     *      ID do Sobrevivente 1 e os itens que ele deseja trocar
     *      ID do Sobrevivente 2 e os itens que ele deseja trocar
     */
    @Path("tradeSingle")
    @POST
    @Accept('application/json', 'application/xml')
    @Produces('application/json')    
    async tradeSingle(trade: Trade): Promise<any> {
        
        let S1: Survivor|null = SurvivorById(trade.survivor1);
        let S2: Survivor|null = SurvivorById(trade.survivor2);
        let p1: number = 0;
        let p2: number = 0;
        if (S1 == null)
            return this.error("Sobrevivente 1 nao pertence a populacao");
        else if (SurvivorInfected(trade.survivor1))
            return this.error("Sobrevivente 1 esta infectado e nao pode efetuar trocas");
        else if (! SurvivorHasResourcesToTrade(trade.survivor1, trade.tradeItems1))
            return this.error("Sobrevivente 1 nao tem recursos suficientes pra essa Troca");
        if (S2 == null)
            return this.error("Sobrevivente 2 nao pertence a populacao");
        else if (S1.uniqueID == S2.uniqueID)
            return this.error("Nao e possivel fazer trocas com os mesmos Sobrevivente.");
        else if (SurvivorInfected(trade.survivor2))
            return this.error("Sobrevivente 2 esta infectado e nao pode efetuar trocas");
        else if (! SurvivorHasResourcesToTrade(trade.survivor2, trade.tradeItems2))
            return this.error("Sobrevivente 2 nao tem recursos suficientes pra essa Troca");
        else if ((p1 = PointsTrade(trade.tradeItems1)) != (p2 = PointsTrade(trade.tradeItems2)))
            return this.error(`Total de pontos dos itens da troca nao sao compativeis. Sobrevivente 1 (${p1} ponto(s)), Sobrevivente 2 (${p2} ponto(s))`);
        else { 
            Store.dispatch(TradeSingle(trade));
            return this.success('Troca realizada com sucesso')
        }
    }

    /**
     * Atualizaca a localizado do Sobrevivente
     */
    @POST
    @Path("updateLocation")
    @Accept('application/json', 'application/xml')
    @Produces('application/json')
    async updateLocation(loc: SurvivorLocation): Promise<any> {
        let S: Survivor|null = SurvivorById(loc.id);
        if (S != null) {
            Store.dispatch(MarkInfected(loc.id));
            let infect = Store.getState().infections[S.uniqueID];
            if (infect.infected) 
                return this.success('Sobrevivente foi marcado como infectado');
            else
            return this.success(`Ja foi(ram) reportado(s) ${infect.reports} infeccao(oes) para esse Sobrevivente`);
        }
        else {
            return this.error('Sobrevivente nao localizado');
        }
    }


}

