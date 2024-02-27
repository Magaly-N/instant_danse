import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { DancerWorkshopController } from "../controllers/dancer.workshop.controller.js";

const initDancerWorkshopRoutes = (app) => {
    const router = express.Router();

    router.post("/create", jwt, checkAdmin, DancerWorkshopController.createDancerWorkshop);
    router.get("/read", DancerWorkshopController.readDancerWorkshops);
    router.get("/readOne", DancerWorkshopController.readOneDancerWorkshop);
    router.put("/update/:dancerWorkshopId", jwt, checkAdmin, DancerWorkshopController.updateDancerWorkshop);
    router.delete("/delete/:dancerWorkshopId", jwt, checkAdmin, DancerWorkshopController.deleteOneDancerWorkshop);

    app.use("/dancer_workshop", router);
};

export default initDancerWorkshopRoutes;
