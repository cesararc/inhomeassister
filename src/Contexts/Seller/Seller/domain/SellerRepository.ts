import { Seller } from "./Seller";

export interface SellerRepository {
    create(seller: Seller): Promise<void>;
}