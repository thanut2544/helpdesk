import express from "express";
import cors from "cors";
import ticketController from "./controllers/ticket.controller";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/tickets", ticketController);
