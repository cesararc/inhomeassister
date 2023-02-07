import { SellerRepository } from '../../domain/SellerRepository';
import { SellerUid } from '../../domain/SellerUid';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';
import { SellerNotFound } from '../../domain/SellerNotFound';

export class SellerProfile {
    constructor(private sellerRepository: SellerRepository, private userRecordRepository: UserRecordRepository) { }

    async run(uid: SellerUid) {
        const userRecord = await this.userRecordRepository.profile(uid);
        const seller = await this.sellerRepository.profile(uid);

        if (!userRecord || !seller) throw new SellerNotFound();

        return { userRecord, seller };
    }
}