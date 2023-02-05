import { CustomerRepository } from '../../domain/CustomerRepository';
import { CustomerDni } from '../../domain/CustomerDni';
import { CustomerNotFound } from '../../domain/CustomerNotFound';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';

export class CustomerMatching {
    constructor(private customerRepository: CustomerRepository, private userRecordRepository: UserRecordRepository) { }

    async run(criteria: CustomerDni) {
        const uid = await this.customerRepository.matching(criteria);

        if (!uid) throw new CustomerNotFound();

        const customer = await this.customerRepository.profile(uid);

        const userRecord = await this.userRecordRepository.profile(uid);

        if (!customer || !userRecord) throw new CustomerNotFound();

        return { customer, userRecord }
    }
}