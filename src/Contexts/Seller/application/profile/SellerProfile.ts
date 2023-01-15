import { SellerRepository } from '../../domain/SellerRepository';
import { SellerUid } from '../../domain/SellerUid';

export class SellerProfile {
    constructor(private repository: SellerRepository) { }

    async run(uid: SellerUid) {
        return await this.repository.profile(uid);

    }
}