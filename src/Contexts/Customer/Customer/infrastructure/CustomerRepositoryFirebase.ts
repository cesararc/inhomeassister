import { CustomerRepository } from "../domain/CustomerRepository";
import { Customer } from '../domain/Customer';
import { AuthRepository } from '../../../Shared/infrastructure/persistence/AuthRepository';

export class CustomerRepositoryFirebase extends AuthRepository<Customer> implements CustomerRepository {

    async create(customer: Customer): Promise<void> {
        await this.persist(customer);
    }
}