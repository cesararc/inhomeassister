import { ServiceProviderRepository } from '../../domain/ServiceProviderRepository';
import { ServiceProviderUid } from '../../domain/ServiceProviderUid';
import { ServiceProviderNotFound } from '../../domain/ServiceProviderNotFound';

export class ServiceProviderProfile {
    constructor(private repository: ServiceProviderRepository) { }

    async run(customerUid: ServiceProviderUid) {
        const customer = await this.repository.profile(customerUid);

        if (!customer) {
            throw new ServiceProviderNotFound();
        }

        return customer;
    }
}