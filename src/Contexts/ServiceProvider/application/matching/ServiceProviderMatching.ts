import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';
import { ServiceProviderDni } from '../../domain/ServiceProviderDni';
import { ServiceProviderNotFound } from '../../domain/ServiceProviderNotFound';
import { ServiceProviderRepository } from '../../domain/ServiceProviderRepository';

export class ServiceProviderMatching {
    constructor(private serviceProviderRepository: ServiceProviderRepository, private userRecordRepository: UserRecordRepository) { }

    async run(criteria: ServiceProviderDni) {
        const uid = await this.serviceProviderRepository.matching(criteria);

        if (!uid) throw new ServiceProviderNotFound();

        const serviceProvider = await this.serviceProviderRepository.profile(uid);

        const userRecord = await this.userRecordRepository.profile(uid);

        if (!serviceProvider || !userRecord) throw new ServiceProviderNotFound();

        return { serviceProvider, userRecord }
    }
}