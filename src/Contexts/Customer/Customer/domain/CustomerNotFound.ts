
export class CustomerNotFound extends Error {
    constructor() {
        super('Customer not found, please try later.');
    }
}