import { CustomerRepository } from "../domain/CustomerRepository";
import { Customer } from '../domain/Customer';
import { AuthRepository } from '../../../Shared/infrastructure/persistence/AuthRepository';
import { CustomerUid } from '../domain/CustomerUid';

export class CustomerRepositoryFirebase extends AuthRepository<Customer> implements CustomerRepository {

    async create(customer: Customer): Promise<void> {
        await this.persist(customer);
    }

    async profile(customerUid: CustomerUid): Promise<Customer> {
        const customer = await this.authentication().getUser(customerUid.value);

        const plainData = { id: customer.uid, displayName: customer.displayName, email: customer.email, phoneNumber: customer.phoneNumber };

        return Customer.fromPrimitives(plainData);
    }
}