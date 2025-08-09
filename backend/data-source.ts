import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.js";
import { Makale } from "./entities/Makale.js";
import { Setting } from "./entities/Setting.js";
import { DevelopmentNote } from "./entities/DevelopmentNote.js";

// Orijinal ve Güvenli Kod
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306, // Varsayılan port
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Makale, Setting, DevelopmentNote],
});
