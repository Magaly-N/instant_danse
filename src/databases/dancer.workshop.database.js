// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour récupérer les 5 premiers ateliers de danse de la base de données
const readDancerWorkshops = async () => {
    const sql = `
        SELECT dancer_workshop_id, title, description, date, hour, duration, city, price, required_dance_level, person_max
        FROM dancer_workshop
        ORDER BY date DESC
        LIMIT 5
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

// Fonction pour récupérer un seul atelier de danse en fonction de son ID
const readOneDancerWorkshop = async (dancerWorkshopId) => {
    const sql = `
        SELECT title, description, date, hour, duration, city, price, required_dance_level, person_max
        FROM dancer_workshop
        WHERE dancer_workshop_id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [dancerWorkshopId]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Fonction pour récupérer tous les ateliers de danse avec leurs détails
const readAllDancerWorkshops = async () => {
    const sql = `
        SELECT dancer_workshop_id, title, description, date, hour, duration, city, price, required_dance_level, person_max
        FROM dancer_workshop
        ORDER BY date DESC
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

// Fonction pour créer un nouvel atelier de danse
const createDancerWorkshop = async (title, description, date, hour, duration, city, price, required_dance_level, person_max) => {
    const sql = `
        INSERT INTO dancer_workshop (title, description, date, hour, duration, city, price, required_dance_level, person_max)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [title, description, date, hour, duration, city, price, required_dance_level, person_max]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Fonction pour supprimer un atelier de danse en fonction de son ID
const deleteOneDancerWorkshop = async (dancerWorkshopId) => {
    const sql = `
        DELETE FROM dancer_workshop
        WHERE dancer_workshop_id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [dancerWorkshopId]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Fonction pour mettre à jour un atelier de danse en fonction de son ID
const updateDancerWorkshop = async (title, description, date, hour, duration, city, price, required_dance_level, person_max, dancerWorkshopId) => {
    const sql = `
        UPDATE dancer_workshop
        SET title = ?, description = ?, date = ?, hour = ?, duration = ?, city = ?, price = ?, required_dance_level = ?, person_max = ?
        WHERE dancer_workshop_id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [title, description, date, hour, duration, city, price, required_dance_level, person_max, dancerWorkshopId]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Exportation des fonctions pour utilisation dans d'autres parties du code
export const DancerWorkshopDB = {
    updateDancerWorkshop,
    readDancerWorkshops,
    readOneDancerWorkshop,
    readAllDancerWorkshops,
    createDancerWorkshop,
    deleteOneDancerWorkshop
};