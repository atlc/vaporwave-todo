import * as passport from "passport";
import { RequestHandler } from "express";

export const tokenCheck: RequestHandler = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
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
