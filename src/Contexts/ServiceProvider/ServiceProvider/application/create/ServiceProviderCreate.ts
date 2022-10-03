import { ServiceProviderRepository } from "../../domain/ServiceProviderRepository";
import { ServiceProviderUid } from '../../domain/ServiceProviderUid';
import { ServiceProvider } from '../../domain/ServiceProvider';
import { ServiceProviderDisplayName } from "../../domain/ServiceProviderDisplayName";
import { ServiceProviderPhone } from '../../domain/ServiceProviderPhone';
import { ServiceProviderEmail } from '../../domain/ServiceProviderEmail';
import { ServiceProviderPassword } from '../../domain/ServiceProviderPassword';
import { ServiceProviderDisabled } from "../../domain/ServiceProviderDisabled";

export class ServiceProviderCreate {
    constructor(private ServiceProviderRepository: ServiceProviderRepository) { }

    async run(id: ServiceProviderUid, disabled: ServiceProviderDisabled, displayName: ServiceProviderDisplayName, phone: ServiceProviderPhone, email: ServiceProviderEmail, password: ServiceProviderPassword): Promise<void> {
        const serviceProvider = ServiceProvider.create(id, disabled, displayName, phone, email, password);

        await this.ServiceProviderRepository.create(serviceProvider);
    }
}