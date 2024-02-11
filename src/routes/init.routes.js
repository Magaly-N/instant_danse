import initUserRoutes from "./user.routes.js";
import initDancerWorkshopRoutes from "./dancer.workshop.routes.js";
import initMessageRoutes from "./message.routes.js";
import initCategoryWorkshopRoutes from "./category.workshop.routes.js";

const initRoutes = (app) => {
    initUserRoutes(app);
    initDancerWorkshopRoutes(app);
    initMessageRoutes(app);
    initCategoryWorkshopRoutes(app);
};

export default initRoutes;
