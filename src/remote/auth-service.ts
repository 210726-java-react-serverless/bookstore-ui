import {Credentials} from "../dtos/credentials";
import {bookstoreClient} from "./bookstore-client";
import {Principal} from "../dtos/principal";
import {RegisterUserRequest} from "../dtos/register-user-request";
import {Auth} from "aws-amplify";

export const getCurrentUser = () => {
    return Auth.currentAuthenticatedUser();
}

export const resendVerificationCode = async (username: string) => {
    let response = await Auth.resendSignUp(username);
    console.log(response);
}

export const confirmUserAccount = async (username: string, code: string) => {
    let response = await Auth.confirmSignUp(username, code);
    console.log(response);
}

export const registerUserAccount = async (newUser: RegisterUserRequest) => {

    let result = await Auth.signUp({
        username: newUser.username,
        password: newUser.password,
        attributes: {
            email: newUser.email,
            name: newUser.firstName + ' ' + newUser.lastName
        }
    });

    console.log(result);

}

export const authenticate = async (credentials: Credentials) => {

    try {
        let response = await Auth.signIn(credentials.username, credentials.password);
        console.log(response);
        return {id: "b11a7dh893h7hdf83nhh", username: "worked", role: "ADMIN"}

    } catch (err: any) {
        console.error(err);
    }
}

export const logout = (setCurrentUser: (nextUser: Principal | undefined) => void) => {
    localStorage.removeItem('api-token')
    setCurrentUser(undefined);
}
