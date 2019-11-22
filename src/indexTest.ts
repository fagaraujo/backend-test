/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */

import ApiServer from "./api-server";
import { Store } from "./store/Store";
import { AddMember } from "./store/Actions";
import { log } from "util";
import { Survivor, ReportInfection, SurvivorResources, ReportLostPoints } from "./store/Types";
import { SurvivorToString } from "./store/Functions";
const request = require("request");

const DoPost = (url: string, jsonData: any) => {
    return new Promise<any>((resolve, reject) => {
        request.post(url, {json: { ...jsonData }}, (err: any, resp: any, body: any) => {
            resolve(body);
        });
    });
}
const DoGet = (url: string) => {
    return new Promise<any>((resolve, reject) => {
        request.get(url, (err: any, resp: any, body: any) => {
            resolve(body);
        });
    });
}
const CheckError = (r: any) => {
    if ((r.status) && (r.status == 'ERROR')) { 
        console.log('Error: ' + r.message)
        console.log('====================================================================================================');
        for (let S of Store.getState().population) {
            let infected = Store.getState().infections[S.uniqueID].infected;
            console.log(`Sobrevivente ${S.name.padEnd(15, ' ')} (${infected?"INFECTADO":"         "}):`, S.resources);
        }
        console.log('====================================================================================================');
        console.log("")
    }
    return r;
}

let server: ApiServer = new ApiServer();
server.start(async (server: ApiServer) => {
    let r: any;

    console.log("\n\n")   

    r = CheckError(await DoPost("http://192.168.228.1:3003/survivor/add", {
        name: 'fagner', age: 28, gender: 'male', location: {latitude: 1, longitude: 2}, resources: {water: 10, food: 10, medicine: 5, ammunition: 2}
    }));
    r = CheckError(await DoPost("http://192.168.228.1:3003/survivor/add", {
        name: 'michelly', age: 27, gender: 'female', location: {latitude: 1, longitude: 2}, resources: {water: 8, food: 7, medicine: 2, ammunition: 3}
    }));
    r = CheckError(await DoPost("http://192.168.228.1:3003/survivor/add", {
        name: 'julia', age: 9, gender: 'female', location: {latitude: 1, longitude: 2}, resources: {water: 8, food: 7, medicine: 2, ammunition: 3}
    }));
    r = CheckError(await DoPost("http://192.168.228.1:3003/survivor/add", {
        name: 'fernnada', age: 7, gender: 'female', location: {latitude: 1, longitude: 2}, resources: {water: 8, food: 7, medicine: 2, ammunition: 3}
    }));

    r = CheckError(await DoPost("http://192.168.228.1:3003/survivor/tradeSingle", {
        survivor1: {name: 'fagner'}, tradeItems1: {water: 2},
        survivor2: {name: 'michelly'}, tradeItems2: {food: 2, ammunition: 2}
    }));

    for (let c = 1; c <= 3; c++) {
        r = CheckError(await DoPost("http://192.168.228.1:3003/survivor/reportInfection", {
            name: 'fagner'
        }));
    }

    r = CheckError(await DoPost("http://192.168.228.1:3003/survivor/reportInfection", {
        name: 'julia'
    }));

    let inf: ReportInfection = CheckError(await DoPost("http://192.168.228.1:3003/reports/infections", {}));
    console.log("RELATORIO GLOBAL DE INFECCAO")    
    console.log('====================================================================================================');
    console.log("Infectados     : ", inf.infected)
    console.log("Nao Infectados : ", inf.noninfected)
    console.log('====================================================================================================');
    console.log("")

    let rec: SurvivorResources = CheckError(await DoPost("http://192.168.228.1:3003/reports/resources", {}));
    console.log("RELATORIO DE RECURSOS POR SOBREVIVENTE")    
    console.log('====================================================================================================');
    console.log("Agua         : ", rec.water.toFixed(2));
    console.log("Comida       : ", rec.food.toFixed(2));
    console.log("Medicamentos : ", rec.medicine.toFixed(2));
    console.log("Municao      : ", rec.ammunition.toFixed(2));
    console.log('====================================================================================================');
    console.log("")

    let recInf: ReportLostPoints = CheckError(await DoPost("http://192.168.228.1:3003/reports/lostpoints", {}));
    console.log("RELATORIO DE RECURSOS PERDIDOS DEVIDO A INFECCOES")    
    console.log('====================================================================================================');
    console.log("Total             : ", recInf.total)
    for (let k in recInf.survivors) {
        console.log(`${k.padEnd(18, ' ')}: `, recInf.survivors[k])

    }
    console.log('====================================================================================================');
    console.log("")

    console.log("\n")    
    console.log("RELATORIO DA POPULACAO")    
    console.log('====================================================================================================');
    for (let S of Store.getState().population) {
        let infected = Store.getState().infections[S.uniqueID].infected;
        console.log(`Sobrevivente ${S.name.padEnd(15, ' ')} (${infected?"INFECTADO":"         "}):`, S.resources);
        console.log(`             ${    ''.padEnd(15, ' ')}             `, SurvivorToString(S));
    }
    console.log('====================================================================================================');

    console.log("\n\n\n")    
    server.stop();
});
