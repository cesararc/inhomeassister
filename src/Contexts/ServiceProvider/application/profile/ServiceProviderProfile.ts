import { ServiceProviderRepository } from '../../domain/ServiceProviderRepository';
import { ServiceProviderUid } from '../../domain/ServiceProviderUid';
import { ServiceProviderNotFound } from '../../domain/ServiceProviderNotFound';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';

export class ServiceProviderProfile {
    constructor(private serviceProviderRepository: ServiceProviderRepository, private userRecordRepository: UserRecordRepository) { }

    async run(uid: ServiceProviderUid) {

        const userRecord = await this.userRecordRepository.profile(uid);
        const serviceProvider = await this.serviceProviderRepository.profile(uid);

        if (!userRecord || !serviceProvider) throw new ServiceProviderNotFound();

        return { serviceProvider, userRecord };
    }
}