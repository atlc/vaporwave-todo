import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import * as JWTStrategy from "passport-jwt";
import { Application } from "express";
import bcrypt_utils from "../utils/bcrypt";
import users from "../db/queries/users";
import { jwtConfig } from "../config";

export function configurePassport(app: Application) {
    passport.use(
        new LocalStrategy.Strategy(
            {
                usernameField: "email"
            },
            async (email, password, done) => {
                try {
                    const [user] = await users.findByEmail(email);
                    if (!user) return done(null, false);

                    const does_match = await bcrypt_utils.compare(password, user.password!);
                    if (!does_match) return done(null, false);

                    delete user.password;
                    done(null, user);
                } catch (error) {
                    console.log(error);
                    done(error, false);
                }
            }
        )
    );

    passport.use(
        new JWTStrategy.Strategy(
            {
                secretOrKey: jwtConfig.secret,
                jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken()
            },
            (payload, done) => {
                if (payload.password) {
                    delete payload.password;
                }
                done(null, payload);
            }
        )
    );
    app.use(passport.initialize());
}
