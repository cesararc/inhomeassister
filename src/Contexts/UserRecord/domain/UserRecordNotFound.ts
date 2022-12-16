
export class UserRecordNotFound extends Error {
    constructor() {
        super('User record not found, please try later.');
    }
}