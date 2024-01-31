import express from 'express';
import initRoutes from "./routes/init.routes.js";
import initMiddlewares from "./middlewares/init.middleware.js";

const app = express();
const PORT = process.env.PORT || 9000;

initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
})