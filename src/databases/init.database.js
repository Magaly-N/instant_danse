import mysql from "mysql";

// process.env.DB_USER -> acces à la variable d'environnement nommée DB_USER

const pool = mysql.createPool({
    connectionLimit: 10000,
    // host: "db.3wa.io", // on rentre l'hôte, l'adresse url où se trouve la bdd
    host: process.env.DB_HOST,
    // user: "magalynouguerede", // identifiant BDD
    user: process.env.DB_USER,
    // password: "bf0f89bc4a0343510b16fd8e5a5e9eb7", // le password
    password: process.env.DB_PASS,
    // database: "magalynouguerede_3watrade", // nom de la base de donnée
    database: process.env.DB_NAME,
});

const query = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, result, fields) => {
            //ce qu'on fait ici une fois que la requête est exécutée
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
};

export default query;
