import { CustomerRepository } from '../../domain/CustomerRepository';
import { CustomerUid } from '../../domain/CustomerUid';
import { CustomerNotFound } from '../../domain/CustomerNotFound';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';

export class CustomerProfile {
    constructor(private customerRepository: CustomerRepository, private userRecordRepository: UserRecordRepository) { }

    async run(uid: CustomerUid) {
        const userRecord = await this.userRecordRepository.profile(uid);
        const customer = await this.customerRepository.profile(uid);

        if (!userRecord || !customer) throw new CustomerNotFound();

        return { userRecord, customer };
    }
}