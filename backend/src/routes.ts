import { Request, Response, Router } from "express";
import {
    BulkUser,
    CreateUserHandler,
    ListUserDetails,
} from "./controllers/user.controller.ts";
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
    ResponseToRequest,
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
router.get("/user/details", ListUserDetails);
router.get("/user/request-to-response",ResponseToRequest );
// http://localhost:9000/api/v1/response-to-request
export const Routes = router;
