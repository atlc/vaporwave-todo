import { Query } from "..";
import { CreateableItem } from "../../../types";

const create = (newItem: CreateableItem) => Query("INSERT INTO Items SET ?", [newItem]);
const all = (user_id: number) => Query("SELECT * FROM Items WHERE user_id=?", [user_id]);
const toggle = (id: number, user_id: number, current_status: boolean) => Query("UPDATE Items SET is_complete=? WHERE id=? AND user_id=?", [!current_status, id, user_id]);
const remove = (id: number, user_id: number) => Query("DELETE FROM Items WHERE id=? AND user_id=?", [id, user_id]);

export default {
    create,
    all,
    toggle,
    remove
};
