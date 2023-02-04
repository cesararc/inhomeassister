import { ServiceProvider } from '../../domain/ServiceProvider';
import { UserRecord } from '../../../UserRecord/domain/UserRecord';

export class ServiceProviderProfileResponse {
    userRecord: UserRecord;
    serviceProvider: ServiceProvider;

    constructor(userRecord: UserRecord, serviceProvider: ServiceProvider) {
        this.userRecord = userRecord;
        this.serviceProvider = serviceProvider;
    }
}