import * as express from "express";
import { tokenCheck } from "../../middlewares/jwtCheck";
import itemsRouter from "./items";

const router = express.Router();

router.use("/items", tokenCheck, itemsRouter);

export default router;
