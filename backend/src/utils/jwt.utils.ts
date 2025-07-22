import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("PRIVATE_KEY");
const publicKey = config.get<string>("PUBLIC_KEY");
export const SignJWT = (payload: Object, options?: jwt.SignOptions) => {
    return jwt.sign(payload, privateKey, {
        ...(options && options),
    });
};
export const VerifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (error: any) {
        return {
            valid: false,
            expired: error.name == "TokenExpiredError",
            decoded: null,
        };
    }
};
