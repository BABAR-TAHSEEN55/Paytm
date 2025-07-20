import { Express, Request, Response } from "express";
import { CreateUserHandler } from "./controllers/user.controller.ts";

export const Routes = (app: Express) => {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200);
    });
    app.post("/signin", CreateUserHandler);
};
