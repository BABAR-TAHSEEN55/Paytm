import dotenv from "dotenv";
dotenv.config();
export default {
    DBURL: `mongodb+srv://${process.env.MONGOD_USER}:${process.env.MONGOD_PASSWORD}@cluster0.fmjrv.mongodb.net/SpendWisee`,
    PORT: 9000,
    SALT: 10,
    PRIVATE_KEY: `${process.env.PRIVATE_KEY}`,
    PUBLIC_KEY: `${process.env.PRIVATE_KEY}`,
    AccessTokenTTl: "1d",
    RefreshTokenTTl: "2d",
};

//TODO : Might migrate to SQL
//TODO : User can track theri finances and can have todo pending purchases with nice charts and expected time
