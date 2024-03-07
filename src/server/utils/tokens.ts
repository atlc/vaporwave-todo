import * as jwt from "jsonwebtoken";
import { Payload } from "../../types";
import { jwtConfig } from "../config";

const sign = (payload: Payload) => jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiration });
const verify = (payload: string) => jwt.verify(payload, jwtConfig.secret);

export default {
    sign,
    verify
};
