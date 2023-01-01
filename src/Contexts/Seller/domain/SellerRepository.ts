import { Seller } from "./Seller";
import { SellerUid } from './SellerUid';

export interface SellerRepository {
    create(seller: Seller): Promise<void>;
    profile(uid: SellerUid): Promise<Seller>;
    update(seller: Seller): Promise<void>;
}