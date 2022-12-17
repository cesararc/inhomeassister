import { Seller } from '../domain/Seller';
import { SellerRepository } from '../domain/SellerRepository';

export class SellerRepositoryFirebase implements SellerRepository {

    async create(seller: Seller): Promise<void> {
        // await this.persist(seller);
    }
}