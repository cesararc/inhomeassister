
export class AdminNotFound extends Error {
    constructor() {
        super('Admin not found, please try later.');
    }
}