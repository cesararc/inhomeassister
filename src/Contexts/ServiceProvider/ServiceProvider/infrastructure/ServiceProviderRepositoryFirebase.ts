import { ServiceProviderRepository } from '../domain/ServiceProviderRepository';
import { ServiceProvider } from '../domain/ServiceProvider';
import { ServiceProviderUid } from '../domain/ServiceProviderUid';
import { FirebaseRepository } from '../../../Shared/infrastructure/persistence/FirebaseRepository';

type ServiceProviderPlainData = {
    uid: string;
    address: string;
    dni: string;
    description: string;
}

export class ServiceProviderRepositoryFirebase extends FirebaseRepository<ServiceProvider> implements ServiceProviderRepository {

    async create(serviceProvider: ServiceProvider): Promise<void> {
        await this.persist(serviceProvider);
    }

    async profile(uid: ServiceProviderUid): Promise<ServiceProvider> {
        const reference = await this.collection().doc(uid.value).get();

        const doc = reference.data() as ServiceProviderPlainData;

        return ServiceProvider.fromPrimitives({ uid: doc.uid, address: doc.address, dni: doc.dni, description: doc.description });
    }

    moduleName(): string {
        return "service_provider"
    }
}