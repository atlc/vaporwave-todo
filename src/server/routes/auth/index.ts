import * as express from "express";
import { loginCheck } from "../../middlewares/login";
import { CreatableUser } from "../../../types/index";
import users from "../../db/queries/users";
import bcrypt_utils from "../../utils/bcrypt";
import token_utils from "../../utils/tokens";
import { tokenCheck } from "../../middlewares/jwtCheck";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password }: CreatableUser = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: "Must have valid data for name, email, and password" });
        return;
    }

    try {
        const hashed = await bcrypt_utils.hash(password);
        const { insertId } = await users.register({ name, email, password: hashed });

        const token = token_utils.sign({ id: insertId, email });

        res.status(201).json({ message: "Congrats!", id: insertId, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured while registering the user :(" });
    }
});

router.post("/login", loginCheck, async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Invalid credentials" });

    const token = token_utils.sign({ id: req.user.id, email: req.user.email });

    res.json({ message: "Successfully logged in!", token });
});

router.get("/verify", tokenCheck, (req, res) => res.json({ message: "Token valid!" }));

export default router;
