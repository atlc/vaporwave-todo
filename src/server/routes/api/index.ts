import * as express from "express";
import { tokenCheck } from "../../middlewares/jwtCheck";
import itemsRouter from "./items";

const router = express.Router();

router.use("/health", (req, res) => res.status(200).json({ message: "All's good here!" }));

router.use("/items", tokenCheck, itemsRouter);

export default router;
