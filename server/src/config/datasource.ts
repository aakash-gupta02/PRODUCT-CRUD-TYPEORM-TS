import { DataSource } from "typeorm";
import { Product } from "../entity/product";

export const datasource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    port: 5432,
    password: "root",
    database: "crudpost",
    synchronize: true,
    logging: true,
    entities: [Product],
})