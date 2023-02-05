import { ServiceProviderRepository } from '../domain/ServiceProviderRepository';
import { ServiceProvider } from '../domain/ServiceProvider';
import { ServiceProviderUid } from '../domain/ServiceProviderUid';
import { ServiceProviderDni } from '../domain/ServiceProviderDni';
import { Nullable } from '../../Shared/domain/Nullable';
import firestore from '../../../Apps/database';

type ServiceProviderPlainData = {
    uid: string;
    address: string;
    dni: string;
    description: string;
}

export class ServiceProviderRepositoryFirebase implements ServiceProviderRepository {

    async create(serviceProvider: ServiceProvider): Promise<void> {
        const collection = this.collection().doc(serviceProvider.toPrimitives().uid);
        const document = { ...serviceProvider.toPrimitives() };

        await collection.set(document);
    }

    async profile(uid: ServiceProviderUid): Promise<ServiceProvider> {
        const reference = await this.collection().doc(uid.value).get();
        const doc = reference.data() as ServiceProviderPlainData;

        const data = { uid: doc.uid, address: doc.address, dni: doc.dni, description: doc.description };

        return ServiceProvider.fromPrimitives(data);
    }


    async update(serviceProvider: ServiceProvider): Promise<void> {
        try {
            const collection = this.collection().doc(serviceProvider.toPrimitives().uid);

            await collection.update(serviceProvider.toPrimitives());

        } catch (error) {
            return null;
        }
    }

    async matching(criteria: ServiceProviderDni): Promise<Nullable<ServiceProviderUid>> {
        const result = await this.collection().where("dni", "==", criteria.value).get();

        if (result.empty) return null;

        const reference = result.docs[0];
        const document = reference.data() as ServiceProviderPlainData;

        return document ? new ServiceProviderUid(document.uid) : null;
    }

    protected collection() {
        return firestore.collection(this.moduleName());
    }


    moduleName(): string {
        return "service_provider"
    }
}