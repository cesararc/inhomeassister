import { ServiceProvider } from "./ServiceProvider";

export interface ServiceProviderRepository {
    create(serviceProvider: ServiceProvider): Promise<void>;
}