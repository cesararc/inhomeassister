import { Seller } from "./Seller";
import { SellerUid } from './SellerUid';

export interface SellerRepository {
    /**
    * Create seller
    * @param seller - Seller entitie
    *
    * @returns A promise void.
    */
    create(seller: Seller): Promise<void>;
    /**
    * PProfile seller
    * @param uid - seller uid
    *
    * @returns A promise seller entitie.
    */
    profile(uid: SellerUid): Promise<Seller>;
    /**
    * Update seller
    * @param seller - Seller entitie
    *
    * @returns A promise void.
    */
    update(seller: Seller): Promise<void>;
}