import { ServiceProviderRepository } from '../domain/ServiceProviderRepository';
import { ServiceProvider } from '../domain/ServiceProvider';
import { AuthRepository } from '../../../Shared/infrastructure/persistence/AuthRepository';

export class ServiceProviderRepositoryFirebase extends AuthRepository<ServiceProvider> implements ServiceProviderRepository {

    async create(serviceProvider: ServiceProvider): Promise<void> {
        await this.persist(serviceProvider);
    }
}