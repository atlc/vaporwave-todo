import * as dotenv from "dotenv";
import * as mysql from "mysql";
dotenv.config();

export const mysqlConfig: mysql.PoolConfig = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
};

const secret = process.env.JWT_SECRET || "lol";
const expiration = process.env.JWT_EXPIRATION || "10d";

if (!secret || !expiration) throw new Error("MISSING JWT SIGNING KEY OR NO EXPIRATION PROVIDED");

export const jwtConfig = {
    secret,
    expiration,
};
