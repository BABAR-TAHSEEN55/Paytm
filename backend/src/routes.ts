import { Request, Response, Router } from "express";
import { CreateUserHandler } from "./controllers/user.controller.ts";
import { CreateSessionHandler } from "./controllers/session.controller.ts";
import { CreateAccountHanlder } from "./controllers/Account.controller.ts";
const router = Router();
router.get("/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200),
);
router.post("/user/signup", CreateUserHandler);
router.post("/user/signin", CreateSessionHandler);
router.get("/user/account", CreateAccountHanlder);
export const Routes = router;
