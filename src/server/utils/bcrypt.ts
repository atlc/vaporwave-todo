import * as bcrypt from "bcrypt";

const hash = (plaintext: string) => bcrypt.hash(plaintext, 12);
const compare = (plaintext: string, hashed: string) => bcrypt.compare(plaintext, hashed);

export default {
    hash,
    compare
};
