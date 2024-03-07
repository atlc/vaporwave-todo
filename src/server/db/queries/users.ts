import { Query } from "..";
import { CreatableUser, User } from "../../../types";

const register = (newUser: CreatableUser) => Query("INSERT INTO Users SET ?", [newUser]);
const findByEmail = (email: string) => Query<User[]>("SELECT * FROM Users WHERE email=?", [email]);

export default {
    register,
    findByEmail
};
