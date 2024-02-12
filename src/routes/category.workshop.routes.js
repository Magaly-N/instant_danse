import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { CategoryWorkshopController } from "../controllers/category.workshop.controller.js";

const initCategoryWorkshopRoutes = (app) => {
    const router = express.Router();

    router.post("/create", jwt, checkAdmin, CategoryWorkshopController.createCategoryWorkshop);
    router.get("/read", CategoryWorkshopController.readCategoryWorkshops);
    router.get("/:categoryWorkshopId", CategoryWorkshopController.readOneCategoryWorkshop);
    router.put("/:categoryWorkshopId", jwt, checkAdmin, CategoryWorkshopController.updateCategoryWorkshop);
    router.delete("/:categoryWorkshopId", jwt, checkAdmin, CategoryWorkshopController.deleteOneCategoryWorkshop);

    app.use("/category", router);
};

export default initCategoryWorkshopRoutes;
