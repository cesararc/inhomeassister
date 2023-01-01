import { Seller } from '../../domain/Seller';

export class SellerProfileResponse {
    seller: Seller;

    constructor(seller: Seller) {
        this.seller = seller;
    }
}