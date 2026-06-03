import { DataSource } from "typeorm";
import { Usuario } from "./entity/Usuario.js";
import { Titulo } from "./entity/Titulo.js";
import { Tipo } from "./entity/Tipo.js";

export const AppDataSource = new DataSource({
    type: 'better-sqlite3',
    database: './assistidos.db',
    synchronize: true,
    logging: true,
    entities: [Usuario,Titulo,Tipo]
})