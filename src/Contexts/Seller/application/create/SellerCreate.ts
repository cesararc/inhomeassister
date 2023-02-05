import { SellerRepository } from '../../domain/SellerRepository';
import { SellerUid } from '../../domain/SellerUid';
import { SellerAddress } from '../../domain/SellerAddress';
import { SellerDni } from '../../domain/SellerDni';
import { Seller } from '../../domain/Seller';
import { EventBus } from '../../../Shared/domain/EventBus';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';
import { UserRecordDisplayName } from '../../../UserRecord/domain/UserRecordDisplayName';
import { UserRecordPhone } from '../../../UserRecord/domain/UserRecordPhone';
import { UserRecordEmail } from '../../../UserRecord/domain/UserRecordEmail';
import { UserRecordPassword } from '../../../UserRecord/domain/UserRecordPassword';
import { UserRecordClaim } from '../../../UserRecord/domain/UserRecordClaim';
import { UserRecord } from '../../../UserRecord/domain/UserRecord';

export class SellerCreate {
    constructor(
        private sellerRepository: SellerRepository,
        private userRecordRepository: UserRecordRepository,
        private eventBus: EventBus) { }

    async run(
        uid: SellerUid,
        displayName: UserRecordDisplayName,
        phoneNumber: UserRecordPhone,
        email: UserRecordEmail,
        password: UserRecordPassword,
        claim: UserRecordClaim,
        address: SellerAddress,
        dni: SellerDni): Promise<void> {

        try {
            const userRecord = UserRecord.create(uid, displayName, phoneNumber, email, password, claim);

            await this.userRecordRepository.create(userRecord);

            const serviceProvider = Seller.create(uid, address, dni);

            await this.sellerRepository.create(serviceProvider);

            await this.eventBus.publish(serviceProvider.pullDomainEvents());
        } catch (error) {
            // Rollback user record repository
            await this.userRecordRepository.delete(uid);
        }
    }
}