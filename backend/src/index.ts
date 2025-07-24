import express from "express";
import config from "config";
import { ConnectionDB } from "./utils/Connection.ts";
import { Routes } from "./routes.ts";
import cors from "cors";
import { DeserializeUser } from "./middlewares/DeserializeUser.ts";
const PORT = config.get<number>("PORT");

const app = express();
//Allow all requests
app.use(cors());
app.use(express.json());
app.use(DeserializeUser);
app.use("/api/v1/", Routes);
(async () => {
    console.log("Establishing connection..");
    await ConnectionDB();
    app.listen(PORT, () =>
        console.log(`Server started Successfully at ${PORT}`),
    );
})();
//TODO : Implement a Logger
