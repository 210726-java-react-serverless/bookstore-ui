import {RegisterUserRequest} from "../dtos/register-user-request";
import {bookstoreClient} from "./bookstore-client";

export const getAllUsers = async () => {

};

export const registerNewUser = async (newUser: RegisterUserRequest) => {

    let resp = await bookstoreClient.post('/users', newUser);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

};

export const getMyProfileInfo = async () => {

}
