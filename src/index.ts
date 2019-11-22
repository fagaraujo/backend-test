/**
 * ZSSN (Zombie Survival Social Network)
 * Desenvolvedor: Fagner Araujo
 */

import ApiServer from "./api-server";
import { Store } from "./store/Store";
import { AddMember } from "./store/Actions";
import { log } from "util";
import { Survivor } from "./store/Types";
const request = require("request");

let server: ApiServer = new ApiServer();
server.start((server: ApiServer) => {

});
