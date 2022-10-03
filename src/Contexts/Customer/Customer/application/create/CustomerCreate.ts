import { CustomerRepository } from '../../domain/CustomerRepository';
import { CustomerUid } from '../../domain/CustomerUid';
import { CustomerDisplayName } from '../../domain/CustomerDisplayName';
import { CustomerEmail } from '../../domain/CustomerEmail';
import { CustomerPassword } from '../../domain/CustomerPassword';
import { CustomerPhone } from '../../domain/CustomerPhone';
import { Customer } from '../../domain/Customer';

export class CustomerCreate {
    constructor(private customerRepository: CustomerRepository) { }

    async run(id: CustomerUid, displayName: CustomerDisplayName, phone: CustomerPhone, email: CustomerEmail, password: CustomerPassword): Promise<void> {
        const customer = Customer.create(id, displayName, phone, email, password);

        await this.customerRepository.create(customer);
    }
}