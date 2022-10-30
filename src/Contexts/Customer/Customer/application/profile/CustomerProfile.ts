import { CustomerRepository } from '../../domain/CustomerRepository';
import { CustomerUid } from '../../domain/CustomerUid';
import { CustomerNotFound } from '../../domain/CustomerNotFound';

export class CustomerProfile {
    constructor(private repository: CustomerRepository) { }

    async run(customerUid: CustomerUid) {
        const customer = await this.repository.profile(customerUid);
        if (!customer) {
            throw new CustomerNotFound();
        }

        return customer;
    }
}