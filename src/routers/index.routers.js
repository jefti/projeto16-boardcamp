import { Router } from "express";
import gamesRouter from "./games.routers.js";
import customersRouters from "./customers.routers.js";
import rentalsRouter from "./rentals.routers.js";

const router = Router()
    router.use(gamesRouter);
    router.use(customersRouters);
    router.use(rentalsRouter);

export default router