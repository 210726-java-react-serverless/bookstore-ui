export class Address {

    unitNumber: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;

    constructor(unit: string, street: string, city: string, state: string, postal: string) {
        this.unitNumber = unit;
        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postal;
    }

}
