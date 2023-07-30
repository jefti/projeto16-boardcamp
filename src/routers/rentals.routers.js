import { Router } from "express";
import { validateRentals } from "../middlewares/validateRentals.middleware.js";
import { RegisterRental,getRentals, returnGame,finalizarRental } from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();
rentalsRouter.get("/rentals",getRentals );
rentalsRouter.post("/rentals",validateRentals, RegisterRental);
rentalsRouter.post("/rentals/:id/return", returnGame);
rentalsRouter.delete("/rentals/:id", finalizarRental);
export default rentalsRouter;