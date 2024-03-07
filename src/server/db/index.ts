import * as mysql from "mysql";
import { mysqlConfig } from "../config";

const pool = mysql.createPool(mysqlConfig);

export const Query = <GenericBoi9001 = mysql.OkPacket>(sql: string, values: unknown[] = []) => {
    return new Promise<GenericBoi9001>((resolve, reject) => {
        pool.query(sql, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
