import "reflect-metadata";
import { DataSource } from "typeorm";
import express, { Request, Response } from "express";
import { router as makaleRouter } from "./router/makaleRouter.js";
import { router as yazarRouter } from "./router/yazarRouter.js";
import { router as authRouter } from "./router/authRoute.js";
import dotenv from "dotenv";

import { User } from "./entities/user.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
    })
);

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User],
});

(async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    } catch (error) {
        console.error("Error during Data Source initialization", error);
    }
})();

app.use("/api/auth/", authRouter);
app.use("/api/makale/", yazarRouter);
app.use("/api/makale/", makaleRouter);

app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} üzerinde çalışıyor.`);
});
