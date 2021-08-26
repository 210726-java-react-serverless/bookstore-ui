import { Address } from "./address";

export class UserResponse {

    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    registrationDateTime: string;
    address: Address

    constructor(id: string, fn: string, ln: string, un: string, email: string, role: string, regDt: string, address: Address) {
        this.id = id;
        this.firstName = fn;
        this.lastName = ln;
        this.username = un;
        this.email = email;
        this.role = role;
        this.registrationDateTime = regDt;
        this.address = address;
    }

}
