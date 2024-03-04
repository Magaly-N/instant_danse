import query from "./init.database.js";

// Fonction pour vérifier l'existence d'un email dans la base de données
const emailExist = async (email) => {
    const sql = ` SELECT COUNT(*) as count from users where email= ?`;
    let result = await query(sql, [email]);

    result = result[0].count;

    return { result };
};

// Fonction pour créer un nouvel utilisateur dans la base de données
const create = async (first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, hashedPassword, role) => {
    const sql = `
   INSERT INTO users (first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, password, role) 
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour créer un nouvel utilisateur
        result = await query(sql, [first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, hashedPassword, role]);
    }
    catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    }
    finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};

const read = async () => {
    const sql = `
          SELECT user_id, first_name, last_name, dance_level, email
          FROM users
          ORDER BY last_name DESC
      `;

    let error = null;
    let result = null;

    try {
        result = await query(sql);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Requête pour sélectionner les informations personnelles du compte de l'utilisateur à afficher lorsqu'il est connecté
const readOneUser = async (id) => {
    const sql = `
        SELECT first_name, last_name, birthday, address, postcode, city, phone_number, email
        FROM users
        WHERE user_id = ?
    `;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour récupérer les informations d'un utilisateur
        result = await query(sql, [id]);
    } catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    } finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};

// Requête pour récupérer les informations d'authentification d'un utilisateur lors de la connexion
const signIn = async (email) => {
    const sql = `
  SELECT user_id, email, password, role
  FROM users
  WHERE email = ?`;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour récupérer les informations d'authentification
        result = await query(sql, [email]);
    }
    catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    }
    finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};

// Requête pour enregistrer un utilisateur à un atelier de danse
const signUpWorkshop = async (userId, workshopId) => {
    const sql = `INSERT INTO user_dancer_workshop (user_id, dancer_workshop_id) VALUES (?,?)`;
    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour enregistrer un utilisateur à un atelier de danse
        result = await query(sql, [userId, workshopId]);
    }
    catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    }
    finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
}

// Requête pour vérifier si un utilisateur est déjà enregistré à un atelier de danse
const isRegistered = async (userId, workshopId) => {
    const sql = `SELECT COUNT(*) AS count FROM user_dancer_workshop WHERE user_id=? AND dancer_workshop_id=?`;

    let result = await query(sql, [userId, workshopId]);
    result = result[0].count;

    return { result };
}

// Exportation des fonctions dans user.controller
export const UserDB = {
    emailExist,
    create,
    read,
    readOneUser,
    signIn,
    signUpWorkshop,
    isRegistered
};
