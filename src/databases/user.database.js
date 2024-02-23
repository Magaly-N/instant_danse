import query from "./init.database.js";

const emailExist = async (email) => {
    const sql = ` SELECT COUNT(*) as count from users where email= ?`;
    let result = await query(sql, [email]);

    result = result[0].count;

    return { result };
};

const create = async (first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, hashedPassword, role) => {
    const sql = `
   INSERT INTO users (first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, password, role) 
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, hashedPassword, role]);
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
  SELECT user_id, email, password, role
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

export const UserDB = {
    emailExist,
    create,
    signIn
};
