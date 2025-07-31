import { Request, Response, Router } from "express";
import { CreateUserHandler } from "./controllers/user.controller.ts";
import { CreateSessionHandler } from "./controllers/session.controller.ts";
import {
    CreateAccountHanlder,
    GetBalance,
    Transaction,
} from "./controllers/Account.controller.ts";
const router = Router();
router.get("/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200),
);
router.post("/user/signup", CreateUserHandler);
router.post("/user/signin", CreateSessionHandler);
router.get("/user/account", CreateAccountHanlder);
router.get("/user/balance", GetBalance);
router.post("/user/transactions", Transaction);
export const Routes = router;
