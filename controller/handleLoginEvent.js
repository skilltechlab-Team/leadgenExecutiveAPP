import { Auth } from "aws-amplify";
import getStatus, { statusNames } from "../constants/Satus";
const handleLoginEvent = async (loginHandler, setStatus) => {
    try {
        const user = await Auth.signIn(loginHandler.username, loginHandler.password);

        const token = user.signInUserSession.accessToken;
        if (token !== undefined) {
            return token;
        } else {
            setStatus(getStatus(statusNames.error, "Invalid Token or Network Error Occured"))
            return -1
        };
    } catch (error) {
        if (!error.message) {
            setStatus(getStatus(statusNames.error, JSON.stringify(error)))
        } else {
            setStatus(getStatus(statusNames.error, error.message))
        }
        console.log(error);
        return -1;
    }
}
export const getCurrentAuthenticatedUser = async (setStatus) => {
    try {
        const userArr = []
        const user = await Auth.currentAuthenticatedUser()
        const JWTtoken = user.signInUserSession.accessToken;
        const userAttr = await Auth.userAttributes(user)
        userArr.push({ token: JWTtoken, userAttr })
        if (user) {
            return userArr;
        }
        else {
            setStatus(getStatus(statusNames.error, "Invalid Token or Network Error Occured"))
            return false;
        }
    } catch (error) {
        if (!error.message) {
            setStatus(getStatus(statusNames.error, JSON.stringify(error)))
        } else {
            setStatus(getStatus(statusNames.error, error.message))
        }
        return false;
    }
}
export default handleLoginEvent;