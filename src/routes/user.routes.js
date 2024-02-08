import express from "express";
import { UserController } from "../controllers/user.controller.js";

const initUserRoutes = (app) => {
    const router = express.Router();

    router.post("/sign-up", UserController.create);
    router.post("/sign-in", UserController.signIn);

    app.use("/users", router);
};

export default initUserRoutes;
