import { Auth } from "aws-amplify";

const handleResetPassword = async (username) => {
    try {
        const response = await Auth.forgotPassword(username);
        return (response);
    } catch (error) {
        return error;
    }
}

export const fotgotPasswordSubmit = async (username, code, new_password) => {
    try {
        const r = await Auth.forgotPasswordSubmit(username, code, new_password);
        return r;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export default handleResetPassword;
