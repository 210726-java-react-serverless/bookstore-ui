import {Credentials} from "../dtos/credentials";
import {bookstoreClient} from "./bookstore-client";
import {Principal} from "../dtos/principal";


export const authenticate = async (credentials: Credentials) => {

    let resp = await bookstoreClient.post('/auth', credentials);

    if (resp.status === 401) {
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);

    return resp.data;

}

export const logout = (setCurrentUser: (nextUser: Principal | undefined) => void) => {
    localStorage.removeItem('api-token')
    setCurrentUser(undefined);
}
