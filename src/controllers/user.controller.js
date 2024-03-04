import isEmail from "validator/lib/isEmail.js";
import { UserDB } from "../databases/user.database.js";
import { jwtSign } from "../middlewares/jwt.mdlwr.js";
import { stringIsFilled } from "../utils/string.utils.js";
import { hashPass, compareHash } from "../utils/crypto.utils.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";

// Fonction pour créer un utilisateur
const create = async (req, res) => {
    // Extraction des données de la requête
    const { first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, password, role } = req.body;

    // Vérification de l'existence de l'email dans la base de données
    const result = await UserDB.emailExist(email);

    // Validation de l'email
    if (!email || !isEmail(email)) {
        return res.status(403).json({ message: `Email invalide !` });
    }

    // Validation du mot de passe
    if (!password || password.length <= 4) {
        return res
            .status(403)
            .json({ message: `Le mot de passe doit contenir au moins 5 caractères` });
    }

    // Hachage du mot de passe
    const hashResult = await hashPass(password);
    const hashError = hashResult.error;
    if (hashError) {
        return res.status(500).json({ message: hashError });
    }
    const hashedPassword = hashResult.hashed;

    // Vérification de l'existence de l'email dans la base de données
    if (result.result >= 1) {
        return res
            .status(403)
            .json({
                message: `Email déjà existant`
            });
    } else {
        // Création de l'utilisateur dans la base de données
        const response = await UserDB.create(first_name, last_name, birthday, address, postcode, city, phone_number, dance_level, email, hashedPassword, role);
        const responseError = response.error;

        if (responseError) {
            return res.status(500).json({ message: responseError });
        }

        const userId = response.result.insertId;

        return res.status(200).json({ message: "Utilisateur créé", user: userId });
    }
};

const read = async (req, res) => {
    const response = await UserDB.read();
    const result = response.result;

    return res.status(200).json({ message: "Request OK", users: result });
};

// Fonction pour afficher les informations personnelles d'un utilisateur
const readOneUser = async (req, res) => {
    const response = await UserDB.readOneUser(req.query.id);
    const result = response.result;

    const user = {
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        birthday: result[0].birthday,
        address: result[0].address,
        postcode: result[0].postcode,
        city: result[0].city,
        phone_number: result[0].phone_number,
        email: result[0].email,
    };

    return res.status(200).json({ message: "Requête OK", user });
};

// Fonction pour l'authentification d'un utilisateur
const signIn = async (req, res) => {
    const { email, password } = req.body;

    // Validation de l'email
    if (!email || !isEmail(email)) {
        return res.status(403).json({ message: `Email invalide` });
    }

    // Validation du mot de passe
    if (!stringIsFilled(password)) {
        return res.status(403).json({ message: `Mot de passe invalide` });
    }

    // Récupération des informations de l'utilisateur depuis la base de données
    const response = await UserDB.signIn(email);
    const responseErr = response.error;
    if (responseErr) {
        return res.status(500).json({ message: responseErr });
    }

    const result = response.result;
    const user = result[0];

    // Vérification de l'existence de l'utilisateur
    if (!user) {
        return res.status(401).json({ message: `Échec de l'authentification` });
    }

    const userId = user.user_id;
    const role = user.role;
    const dbPassword = user.password;

    // Comparaison des mots de passe hachés
    const passAreSame = await compareHash(password, dbPassword);
    if (!passAreSame) {
        return res.status(401).json({ message: `Échec de l'authentification` });
    }

    // Génération du jeton JWT
    const token = jwtSign(userId);
    return res
        .status(200)
        .json({ message: `Connexion réussie`, user: { userId, email, token, role } });
};

// Fonction pour l'inscription à un atelier
const signUpWorkshop = async (req, res) => {
    const userId = req.query.userId;
    const workshopId = req.query.workshopId;

    // Appel à la fonction de la base de données pour l'inscription à l'atelier
    const response = await UserDB.signUpWorkshop(userId, workshopId);

    const error = response.error; // soit une chaîne de caractères, soit null

    if (error) {
        return res.status(500).json({ message: error });
    } else {
        return res.status(200).json({ message: "Inscription réussie" });
    }
};

// Fonction pour vérifier si un utilisateur est déjà inscrit à un atelier
const isRegistered = async (req, res) => {
    const userId = req.query.userId;
    const workshopId = req.query.workshopId;

    // Appel à la fonction de la base de données pour vérifier l'inscription
    const response = await UserDB.isRegistered(userId, workshopId);

    // Vérification de l'existence d'une inscription
    if (response.result >= 1) {
        return res
            .status(409)
            .json({
                message: `Déjà inscrit`
            });
    }
};

// Exportation de l'objet contenant toutes les fonctions du contrôleur des utilisateurs
export const UserController = {
    create,
    read,
    readOneUser,
    signIn,
    signUpWorkshop,
    isRegistered
};
