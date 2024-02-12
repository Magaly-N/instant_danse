import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { MessageController } from "../controllers/message.controller.js";

const initMessageRoutes = (app) => {
    const router = express.Router();

    router.post("/create", jwt, checkAdmin, MessageController.createMessage);
    router.get("/read", MessageController.readMessages);
    router.get("/:messageId", MessageController.readOneMessage);
    router.get("/readAllMessages", MessageController.readAllMessages);
    router.put("/:messageId", jwt, checkAdmin, MessageController.updateMessage);
    router.delete("/:messageId", jwt, checkAdmin, MessageController.deleteOneMessage);

    app.use("/message", router);
};

export default initMessageRoutes;
