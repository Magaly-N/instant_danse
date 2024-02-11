import express from "express";
import { MessageController } from "../controllers/message.controller.js";

const initMessageRoutes = (app) => {
    const router = express.Router();

    router.post("/create", MessageController.createMessage);
    router.get("/read", MessageController.readMessages);

    app.use("/message", router);
};

export default initMessageRoutes;
