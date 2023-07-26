import { Router } from "express";
import { findAllGames, registerGames } from "../controllers/games.controllers.js";
import { validateGames } from "../middlewares/validateGames.middleware.js";

const gamesRouter = Router();
gamesRouter.get("/games",findAllGames);
gamesRouter.post("/games", validateGames ,registerGames);
export default gamesRouter;
