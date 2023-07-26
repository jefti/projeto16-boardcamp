import express from "express";
import cors from "cors";
import gamesRouter from "./routers/games.routers.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(gamesRouter);

const Port = 5000;
app.listen(Port, console.log(`O servidor está rodando na porta ${Port}`));