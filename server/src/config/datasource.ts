import { DataSource } from "typeorm";
import { Products } from "../entity/product";
import dotenv from "dotenv"

dotenv.config()

// export const datasource = new DataSource({
//     type: "postgres",
//     url: process.env.DB_URL,
//     synchronize: true,
//     logging: true,
//     entities: [Products],
//   extra: {
//     connectionTimeoutMillis: 15000,
//     idleTimeoutMillis: 10000,
//   },

// })

export const datasource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    port: 5432,
    password: "root",
    database: "crudpost",
    synchronize: true,
    logging: false,
    entities: [Products],
})