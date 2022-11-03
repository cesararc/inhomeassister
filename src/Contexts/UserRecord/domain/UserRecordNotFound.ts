
export class UserRecordNotFound extends Error {
    constructor() {
        super('Customer not found, please try later.');
    }
}