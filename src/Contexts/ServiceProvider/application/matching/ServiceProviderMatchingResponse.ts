import { UserRecord } from '../../../UserRecord/domain/UserRecord';
import { ServiceProvider } from '../../domain/ServiceProvider';

export class ServiceProviderMatchingResponse {
    userRecord: UserRecord;
    serviceProvider: ServiceProvider;

    constructor(serviceProvider: ServiceProvider, userRecord: UserRecord) {
        this.serviceProvider = serviceProvider;
        this.userRecord = userRecord;
    }
}