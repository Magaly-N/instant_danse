import mysql from "mysql";
//import dotenv from 'dotenv';
//dotenv.config({ path: __dirname + '../../.env' });

const pool = mysql.createPool({
    connectionLimit: 10000,
    host: process.env.DB_HOST || "db.3wa.io",
    user: process.env.DB_USER || "magalynouguerede",
    password: process.env.DB_PASS || "7d059406676c26af5c5568d9023c41ff",
    database: process.env.DB_NAME || "magalynouguerede_instant_danse",
});

const query = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, result, fields) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
};

export default query;
