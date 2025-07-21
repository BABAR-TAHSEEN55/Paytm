import { Express, Request, Response, Router } from "express";
import { CreateUserHandler } from "./controllers/user.controller.ts";

const router = Router();
router.get("/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200),
);
router.post("/user/signup", CreateUserHandler);
router.post("/user/signin");
export const Routes = router;
