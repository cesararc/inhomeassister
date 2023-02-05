import { Customer } from '../../domain/Customer';
import { UserRecord } from '../../../UserRecord/domain/UserRecord';

export class CustomerMatchingResponse {
    userRecord: UserRecord;
    customer: Customer;

    constructor(customer: Customer, userRecord: UserRecord) {
        this.customer = customer;
        this.userRecord = userRecord;
    }
}