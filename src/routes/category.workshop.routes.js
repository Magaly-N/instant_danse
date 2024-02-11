import express from "express";
import { CategoryWorkshopController } from "../controllers/category.workshop.controller.js";

const initCategoryWorkshopRoutes = (app) => {
    const router = express.Router();

    router.post("/create", CategoryWorkshopController.createCategoryWorkshop);
    router.get("/read", CategoryWorkshopController.readCategoryWorkshops);

    app.use("/category", router);
};

export default initCategoryWorkshopRoutes;
