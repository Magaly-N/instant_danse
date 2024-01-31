import isEmail from "validator/lib/isEmail.js";
import { UserDB } from "../databases/user.database.js";
import { jwtSign } from "../middlewares/jwt.mdlwr.js";
import { stringIsFilled } from "../utils/string.utils.js";
import { hashPass, compareHash } from "../utils/crypto.utils.js";

const create = async (req, res) => {
    const { email, password, pseudo } = req.body;

    if (!email || !isEmail(email)) {
        return res.status(403).json({ message: `Invalid email !` });
    }

    if (!password || password.length <= 4) {
        return res
            .status(403)
            .json({ message: `Password must have at least 5 characters` });
    }

    const hashResult = await hashPass(password);
    const hashError = hashResult.error;
    if (hashError) {
        return res.status(500).json({ message: hashError });
    }

    const response = await UserDB.create(email, hashResult.hashed);
    const responseError = response.error;

    if (responseError) {
        return res.status(500).json({ message: responseError });
    }

    const userId = response.result.insertId;

    return res.status(200).json({ message: "User created", user: userId });
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !isEmail(email)) {
        return res.status(403).json({ message: `Invalid email` });
    }

    if (!stringIsFilled(password)) {
        return res.status(403).json({ message: `Invalid password` });
    }

    const response = await UserDB.signIn(email);
    const responseErr = response.error;
    if (responseErr) {
        return res.status(500).json({ message: responseErr });
    }

    const result = response.result; // []
    const user = result[0];

    if (!user) {
        return res.status(401).json({ message: `Authentication failed` });
    }

    const userId = user.user_id;
    const dbPassword = user.password;

    const passAreSame = await compareHash(password, dbPassword);
    if (!passAreSame) {
        return res.status(401).json({ message: `Authentication failed` });
    }

    const token = jwtSign(userId);

    return res
        .status(200)
        .json({ message: `sign_in_ok`, user: { userId, email, token } });
};

export const UserController = {
    create,
    signIn,
};
