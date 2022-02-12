import { User } from 'lib/global/types';
import { isPossiblePhoneNumber } from 'libphonenumber-js';
const validator = require("validator");

export const validate = (credentials: User, usersTaken = []) => {
    const { userName, password } = credentials;
    if (!validator.isEmail(userName)) {
        const found = isPossiblePhoneNumber(userName);
        if (!found)
        return  { message: "invalid username err" } ;
    }
    if (password === "" || (password && password.length < 8)) return { message: "invalid password" }
};
