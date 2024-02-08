import query from "./init.database.js";

const create = async (first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, hashedPassword) => {
    const sql = `
   INSERT INTO users (first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, hashedPassword) 
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, hashedPassword]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};
const signIn = async (email) => {
    const sql = `
  SELECT user_id, email, password
  FROM users
  WHERE email = ?`;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [email]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};

export const UserDB = { create, signIn };
