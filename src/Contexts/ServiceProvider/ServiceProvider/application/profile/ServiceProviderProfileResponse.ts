import { ServiceProvider } from '../../domain/ServiceProvider';

export class ServiceProviderProfileResponse {
    serviceProvider: ServiceProvider;

    constructor(serviceProvider: ServiceProvider) {
        this.serviceProvider = serviceProvider;
    }
}