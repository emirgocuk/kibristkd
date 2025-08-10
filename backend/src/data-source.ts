import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Makale } from "./entities/Makale.js";
import { Author } from "./entities/Author.js";
import { Slider } from "./entities/Slider.js";
import { Announcement } from "./entities/Announcement.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // Geliştirme için true, production'da false olmalı
  logging: false,
  entities: [User, Makale, Author, Slider, Announcement],
});