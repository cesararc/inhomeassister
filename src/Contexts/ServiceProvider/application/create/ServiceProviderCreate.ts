import { ServiceProviderRepository } from '../../domain/ServiceProviderRepository';
import { ServiceProviderUid } from '../../domain/ServiceProviderUid';
import { ServiceProvider } from '../../domain/ServiceProvider';
import { ServiceProviderAddress } from '../../domain/ServiceProviderAddress';
import { ServiceProviderDni } from '../../domain/ServiceProviderDni';
import { ServiceProviderDescription } from '../../domain/ServiceProviderDescription';
import { EventBus } from '../../../Shared/domain/EventBus';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';
import { UserRecordClaim } from '../../../UserRecord/domain/UserRecordClaim';
import { UserRecordPassword } from '../../../UserRecord/domain/UserRecordPassword';
import { UserRecordEmail } from '../../../UserRecord/domain/UserRecordEmail';
import { UserRecordPhone } from '../../../UserRecord/domain/UserRecordPhone';
import { UserRecordDisplayName } from '../../../UserRecord/domain/UserRecordDisplayName';
import { UserRecord } from '../../../UserRecord/domain/UserRecord';

export class ServiceProviderCreate {
    constructor(
        private repository: ServiceProviderRepository,
        private userRecordRepository: UserRecordRepository,
        private eventBus: EventBus) { }

    async run(
        uid: ServiceProviderUid,
        displayName: UserRecordDisplayName,
        phoneNumber: UserRecordPhone,
        email: UserRecordEmail,
        password: UserRecordPassword,
        claim: UserRecordClaim,
        address: ServiceProviderAddress,
        dni: ServiceProviderDni,
        description: ServiceProviderDescription): Promise<void> {

        try {
            const userRecord = UserRecord.create(uid, displayName, phoneNumber, email, password, claim);

            await this.userRecordRepository.create(userRecord);

            const serviceProvider = ServiceProvider.create(uid, address, dni, description);

            await this.repository.create(serviceProvider);

            await this.eventBus.publish(serviceProvider.pullDomainEvents());
        } catch (error) {
            // Rollback user record repository
            await this.userRecordRepository.delete(uid);
        }
    }
}