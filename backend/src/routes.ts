import { Request, Response, Router } from "express";
import { BulkUser, CreateUserHandler } from "./controllers/user.controller.ts";
import { CreateSessionHandler } from "./controllers/session.controller.ts";
import {
    CreateAccountHanlder,
    GetBalance,
    GetTransactionHistory,
    Transaction,
} from "./controllers/Account.controller.ts";
import {
    GetAllRequests,
    ReceiveHandler,
} from "./controllers/Receive.controller.ts";
const router = Router();
router.get("/healthcheck", (_req: Request, res: Response) =>
    res.sendStatus(200),
);
router.post("/user/signup", CreateUserHandler);
router.post("/user/signin", CreateSessionHandler);
router.get("/user/account", CreateAccountHanlder);
router.get("/user/bulk", BulkUser);
router.get("/user/balance", GetBalance);
router.get("/user/history", GetTransactionHistory);
router.post("/user/transactions", Transaction);
router.post("/user/request", ReceiveHandler);
router.get("/user/request", GetAllRequests);
export const Routes = router;
