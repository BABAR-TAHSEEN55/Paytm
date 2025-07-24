import { NextFunction, Request, Response } from "express";
import { VerifyJWT } from "../utils/jwt.utils.ts";
import { JwtPayload } from "jsonwebtoken";
export interface JwtCustomPayload extends JwtPayload {
  _id: string;
  username: string;
  email: string;
  Session: string;
}
export interface AuthenticatedRequest extends Request {
  user?: JwtCustomPayload | null;
}

export const DeserializeUser = (
  req: AuthenticatedRequest,
  //NOTE : Learnt this neaw thing
  _res: Response,
  next: NextFunction,
) => {
  const AuthHeader = req.headers["authorization"];
  const AccessToken = AuthHeader && AuthHeader.split(" ")[1];
  if (!AccessToken) {
    return next();
  }
  ``;
  try {
    const { decoded, _expired } = VerifyJWT(AccessToken);
    if (decoded) {
      req.user = decoded as JwtCustomPayload;
      return next();
    }
  } catch (error) {
    console.log("Error while decoding ", error);
  }
};
