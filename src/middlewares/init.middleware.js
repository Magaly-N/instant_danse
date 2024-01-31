import cors from "cors";
import express from "express";

const initMiddlewares = (app) => {
    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({ extended: true }));
    // permet à toutes les urls de fetch le serveur
    app.use(cors({ origin: "*" }));
};

export default initMiddlewares;
