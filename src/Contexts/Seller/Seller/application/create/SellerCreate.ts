import { SellerRepository } from '../../domain/SellerRepository';
import { SellerUid } from '../../domain/SellerUid';
import { SellerDisplayName } from '../../domain/SellerDisplayName';
import { SellerEmail } from '../../domain/SellerEmail';
import { SellerPassword } from '../../domain/SellerPassword';
import { SellerPhone } from '../../domain/SellerPhone';
import { Seller } from '../../domain/Seller';

export class SellerCreate {
    constructor(private sellerRepository: SellerRepository) { }

    async run(id: SellerUid, displayName: SellerDisplayName, phone: SellerPhone, email: SellerEmail, password: SellerPassword): Promise<void> {
        const seller = Seller.create(id, displayName, phone, email, password);

        await this.sellerRepository.create(seller);
    }
}