import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Rotaları import et
import { router as authRouter } from "./router/authRoute.js";
import { router as makaleRouter } from "./router/makaleRouter.js";
import { router as yazarRouter } from "./router/yazarRouter.js";

// Entity'leri import et
import { User } from "./entities/user.js";
import { Makale } from "./entities/Makale.js";

dotenv.config();

const app = express();
const port = 3001;

// AppDataSource'u dışa aktararak diğer dosyalardan erişilebilir yap
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Makale],
});

// Veritabanı bağlantısını kur ve ardından sunucuyu başlat
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        // Middleware'ler
        app.use(cors()); // CORS'u burada kullan
        app.use(express.json({ limit: "50mb" }));
        app.use(express.urlencoded({
            limit: "50mb",
            extended: true,
        }));

        // API rotalarını kullan
        app.use("/api", authRouter);
        app.use("/api", yazarRouter);
        app.use("/api", makaleRouter);

        // Sunucuyu dinlemeye başla
        app.listen(port, () => {
            console.log(`Uygulama http://localhost:${port} üzerinde çalışıyor.`);
        });
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error);
    });

