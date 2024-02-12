import express from 'express';
import initRoutes from "./routes/init.routes.js";
import initMiddlewares from "./middlewares/init.middleware.js";
//import dotenv from 'dotenv';
//dotenv.config();

const PORT = 3000;
console.log("PORT:", process.env.PORT);
const app = express();

initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
})