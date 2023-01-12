
export class SellerNotFound extends Error {
    constructor() {
        super('Seller not found, please try later.');
    }
}