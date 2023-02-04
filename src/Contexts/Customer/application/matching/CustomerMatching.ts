import { CustomerRepository } from '../../domain/CustomerRepository';
import { Nullable } from '../../../Shared/domain/Nullable';
import { Customer } from '../../domain/Customer';
import { CustomerDni } from '../../domain/CustomerDni';
import { CustomerNotFound } from '../../domain/CustomerNotFound';

export class CustomerMatching {
    constructor(private repository: CustomerRepository) { }

    async run(criteria: CustomerDni): Promise<Nullable<Customer>> {
        const customer = await this.repository.matching(criteria);
        if (!customer) {
            throw new CustomerNotFound();
        }

        return customer;
    }
}