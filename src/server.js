import express from 'express';
import initRoutes from "./routes/init.routes.js";
import initMiddlewares from "./middlewares/init.middleware.js";

const PORT = process.env.PORT || 3000;
console.log("PORT:", process.env.PORT);
const app = express();

initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
})