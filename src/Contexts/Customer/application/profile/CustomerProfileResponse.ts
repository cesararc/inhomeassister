import { Customer } from '../../domain/Customer';
import { UserRecord } from '../../../UserRecord/domain/UserRecord';

export class CustomerProfileResponse {
    userRecord: UserRecord;
    customer: Customer;

    constructor(userRecord: UserRecord, customer: Customer,) {
        this.customer = customer;
        this.userRecord = userRecord;
    }
}