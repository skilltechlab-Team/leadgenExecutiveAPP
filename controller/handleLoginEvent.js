import { Auth } from "aws-amplify";

const handleLoginEvent = async (loginHandler) => {
    try {
        const user = await Auth.signIn(loginHandler.username, loginHandler.password);

        const token = user.signInUserSession.accessToken;
        if (token !== undefined) {
            return token;
        } else return -1;
    } catch (error) {
        console.log(error);
        return -1;
    }
}
export const getCurrentAuthenticatedUser = async () => {
    try {
        const userArr = []
        const user = await Auth.currentAuthenticatedUser()
        const JWTtoken = user.signInUserSession.accessToken;
        const userAttr = await Auth.userAttributes(user)
        userArr.push({ token: JWTtoken, userAttr })
        if (user) {
            return userArr;
        }
        else
            return false;
    } catch (error) {
        return false;
    }
}
export default handleLoginEvent;