import { ServiceProvider } from "./ServiceProvider";
import { ServiceProviderUid } from './ServiceProviderUid';

export interface ServiceProviderRepository {
    create(serviceProvider: ServiceProvider): Promise<void>;
    profile(uid: ServiceProviderUid): Promise<ServiceProvider>;
}