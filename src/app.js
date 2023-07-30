import express from "express";
import cors from "cors";
import router from "./routers/index.routers.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const Port = process.env.PORT || 5000;
app.listen(Port, console.log(`O servidor está rodando na porta ${Port}`));