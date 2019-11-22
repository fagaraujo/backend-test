/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */

import express from "express";
import * as http from "http";
import {Server, SwaggerOptions} from "typescript-rest";
import controllers from "./controllers/index";
import bodyParser from "body-parser";
import bodyParserXML from "body-parser-xml";
const cors = require("cors");
///const bodyParser = require("body-parser");
//const bodyParserXML = require("body-parser-xml");

export default class ApiServer {
    port: number;
    host: string;
    app: express.Application;
    http: http.Server;
    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.host = process.env.HOST || "localhost";
        this.port = new Number(process.env.PORT || '3003').valueOf();

        this.configServer();
    }
    interceptor(req: express.Request, resp: express.Response) {

    }

    getHost() {
        return this.host.toLowerCase().trim() == "localhost" ? undefined : this.host;
    }
    
    configServer() {
        let swaggerOpt: SwaggerOptions = {
            filePath: "./dist/swagger.json",
            endpoint: "/api-docs",
            host: `${this.host}:${this.port}`,
            schemes: ["http", "https"],
            swaggerUiOptions: {
                customSiteTitle: 'ZSSN (Zombie Survival Social Network)',
            }
        };

        bodyParserXML(bodyParser);
        this.app.use(cors());
        //this.app.use(bodyParser());
        this.app.use(bodyParser.json({
            "type": "application/json"
        }));
        this.app.use((bodyParser as any).xml({
            limits: '900kb',
            xmlParserOptions: {
                normalize: true,
                normalizeTags: false,
                explicitArray: false,
                attrKey: "@"
            }
        }));

        Server.buildServices(this.app, ...controllers);
        Server.swagger(this.app, swaggerOpt);

    }

    start(onListen?: CallableFunction): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                this.http.addListener('listening', () => {
                    console.log(`Servidor de microservicoes iniciado em ${this.host}:${this.port}`)
                    console.log(`     Acesse http://${this.host}:${this.port}/api-docs/ para visualizar ou testar a API`)
                    if (onListen) {
                        onListen(this);
                    }
                })

                this.http = this.http.listen(this.port, this.getHost());
            }
            catch(e) {
                reject(e);
            }
        });
    }
    stop(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                this.http.close((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log('servidor finalizado com sucesso')
                        resolve(true);
                    }
                });
            }
            catch(e) {
                reject(e)
            }
        });
    }
}