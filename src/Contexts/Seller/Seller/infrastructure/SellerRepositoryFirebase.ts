import { Seller } from '../domain/Seller';
import { SellerRepository } from '../domain/SellerRepository';
import { AuthRepository } from '../../../Shared/infrastructure/persistence/AuthRepository';

export class SellerRepositoryFirebase extends AuthRepository<Seller> implements SellerRepository {

    async create(seller: Seller): Promise<void> {
        await this.persist(seller);
    }
}