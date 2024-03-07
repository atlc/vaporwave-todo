import * as express from "express";
import Items from "../../db/queries/items";

const router = express.Router();

router.get(["/", "/profile"], async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Invalid credentials" });
    const userid = req.query.userid as string | undefined;
    const user_id = userid ? parseInt(userid) : req.user.id;

    try {
        const user_items = await Items.all(user_id);
        res.json(user_items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured getting the todo items", error: error.sqlMessage || error.message });
    }
});

router.post("/", async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Invalid credentials" });
    const user_id = req.user.id;
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: "Must have a valid content property!" });

    try {
        const { insertId } = await Items.create({ user_id, content });
        res.status(201).json({ message: "Yeeeeehawww", id: insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured creating the todo item", error: error.sqlMessage || error.message });
    }
});

router.put("/:id/toggle", async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Invalid credentials" });
    const user_id = req.user.id;
    const id = parseInt(req.params.id);

    const { current_status } = req.body;

    if (current_status === undefined) return res.status(400).json({ message: "Must have a valid content property!" });

    try {
        await Items.toggle(id, user_id, current_status);
        res.status(201).json({ message: "Yeeeeehawww, toggled that one alright" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured updating the todo item", error: error.sqlMessage || error.message });
    }
});

router.delete("/:id", async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Invalid credentials" });
    const user_id = req.user.id;
    const id = parseInt(req.params.id);

    try {
        await Items.remove(id, user_id);
        res.json({ message: "Deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured deleting the todo item", error: error.sqlMessage || error.message });
    }
});

export default router;
