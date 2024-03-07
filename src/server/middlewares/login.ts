import * as passport from "passport";
import { RequestHandler } from "express";

export const loginCheck: RequestHandler = (req, res, next) => {
    passport.authenticate("local", { session: false }, (err: any, user: Express.User, info: any) => {
        if (err) {
            res.status(500).json({ message: "Authentication error!", error: err.message });
            return;
        }

        if (info) {
            res.status(401).json({ message: "Authentication error!", error: info.message });
            return;
        }

        if (!user) {
            res.status(401).json({ message: "Authentication error!", error: "User unknown" });
            return;
        }

        req.user = user;
        next();
    })(req, res, next);
};
