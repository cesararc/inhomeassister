import { auth } from '../../../../Apps/database';
import { ServiceProviderRepository } from '../domain/ServiceProviderRepository';
import { ServiceProvider } from '../domain/ServiceProvider';

export class ServiceProviderRepositoryFirebase implements ServiceProviderRepository {

    async create(serviceProvider: ServiceProvider): Promise<void> {

        const user = {
            displayname: serviceProvider.displayname.value,
            email: serviceProvider.email.value,
            phone: serviceProvider.phone.value,
            password: serviceProvider.password.value,
            uid: serviceProvider.id.value,
            disabled: serviceProvider.disabled.value
        }

        await auth.createUser(user);
    }
}