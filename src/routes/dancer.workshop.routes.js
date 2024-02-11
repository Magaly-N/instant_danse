import express from "express";
import { DancerWorkshopController } from "../controllers/dancer.workshop.controller.js";

const initDancerWorkshopRoutes = (app) => {
    const router = express.Router();

    router.post("/create", DancerWorkshopController.createDancerWorkshop);
    router.get("/read", DancerWorkshopController.readDancerWorkshops);

    app.use("/dancer_workshop", router);
};

export default initDancerWorkshopRoutes;
