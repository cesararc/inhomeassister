import { CustomerRepository } from "../domain/CustomerRepository";
import { Customer } from '../domain/Customer';
import { auth } from '../../../../Apps/database';

export class CustomerRepositoryFirebase implements CustomerRepository {

    async create(customer: Customer): Promise<void> {

        const user = {
            displayName: customer.displayName.value,
            email: customer.email.value,
            phoneNumber: customer.phoneNumber.value,
            password: customer.password.value,
            uid: customer.id.value
        }

        await auth.createUser(user);
    }
}