import { SellerRepository } from '../../domain/SellerRepository';
import { SellerUid } from '../../domain/SellerUid';
import { SellerNotFound } from '../../domain/SellerNotFound';

export class SellerProfile {
    constructor(private repository: SellerRepository) { }

    async run(uid: SellerUid) {
        const customer = await this.repository.profile(uid);

        if (!customer) {
            throw new SellerNotFound();
        }

        return customer;
    }
}