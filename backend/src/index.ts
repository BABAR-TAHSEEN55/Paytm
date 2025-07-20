import express from "express";
import config from "config";
import { ConnectionDB } from "./utils/Connection.ts";
import { Routes } from "./routes.ts";
const PORT = config.get<number>("PORT");
const app = express();
app.use(express.json());
(async () => {
    console.log("Establishing connection..");
    await ConnectionDB();
    Routes(app);
    app.listen(PORT, () =>
        console.log(`Server started Successfully at ${PORT}`),
    );
})();
//TODO : Might migrate to SQL
//TODO : User can track theri finances and can have todo pending purchases with nice charts and expected time
//TODO : Use Router ? but how ?
