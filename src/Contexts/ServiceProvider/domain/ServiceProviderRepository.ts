import { ServiceProvider } from "./ServiceProvider";
import { ServiceProviderUid } from './ServiceProviderUid';
import { ServiceProviderDni } from './ServiceProviderDni';
import { Nullable } from "../../Shared/domain/Nullable";

export interface ServiceProviderRepository {
    /**
    * Create service provider
    * @param serviceProvider - Service provider entitie
    *
    * @returns A promise void.
    */
    create(serviceProvider: ServiceProvider): Promise<void>;
    /**
    * Profile service provider
    * @param uid - Service provider uid
    *
    * @returns A promise service provider.
    */
    profile(uid: ServiceProviderUid): Promise<ServiceProvider>;
    /**
    * Update service provider
    * @param serviceProvider - Service provider entitie
    *
    * @returns A promise void.
    */
    update(serviceProvider: ServiceProvider): Promise<void>;
    /**
    * Update service provider
    * @param serviceProvider - Service provider entitie
    *
    * @returns A promise void.
    */
    matching(param: ServiceProviderDni): Promise<Nullable<ServiceProviderUid>>;
}