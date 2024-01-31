// module JavaScript qui inclut des fonctions permettant de créer
// un utilisateur et de le connecter à l'aide d'une base de données
// Importation de la fonction query : Le code commence par importer 
// une fonction query depuis un fichier nommé "init .base de données.js." 
// Cette fonction est probablement utilisée pour exécuter des requêtes SQL 
// sur une base de données.
import query from "./init.database.js";

// Cette fonction est une fonction asynchrone (async) qui prend un email et un mot de passe
// comme paramètres. Il construit une requête SQL pour insérer un nouvel utilisateur 
// dans une table nommée "utilisateurs". avec l'email et le mot de passe fournis.
// La requête est paramétrée pour empêcher l'injection SQL. 
// La fonction appelle ensuite la fonction query avec la requête SQL et les paramètres fournis. 
// Il renvoie un objet contenant une erreur (le cas échéant) et le résultat de la requête.

const create = async (email, password, pseudo) => {
    const sql = `
   INSERT INTO users (email, password,pseudo) 
   VALUES (?, ?, ?)`;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [email, password, pseudo]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};

//`signIn fonction : Semblable à la fonction create, cette fonction est également asynchrone et prend un email en paramètre.
// Il construit une requête SQL pour récupérer les informations utilisateur (identifiant utilisateur, e-mail, mot de passe)
// auprès des "utilisateurs" et des "utilisateurs". tableau basé sur l’e-mail fourni. 
// La requête est à nouveau paramétrée pour éviter l'injection SQL. 
// La fonction appelle ensuite la fonction query avec la requête SQL et les paramètres fournis. 
// Comme la fonction create, elle renvoie un objet contenant une erreur (le cas échéant) et le résultat de la requête

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

// Exportation UserDB d'un objet : Les fonctions create et signIn sont exportées sous forme méthodes d'un objet nommé UserDB.
// Cela vous permet de les importer et de les utiliser dans d'autres parties de votre application.

export const UserDB = { create, signIn };


// Il est important de noter que la sécurité de votre application dépend de divers facteurs
// et qu'il est crucial de gérer l'authentification des utilisateurs et le stockage des données en toute sécurité.
// De plus, assurez-vous de gérer correctement les erreurs et de nettoyer les entrées pour éviter
// les vulnérabilités de sécurité telles que l'injection SQL.
