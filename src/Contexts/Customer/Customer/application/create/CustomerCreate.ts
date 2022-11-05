import { CustomerRepository } from '../../domain/CustomerRepository';
import { CustomerUid } from '../../domain/CustomerUid';
import { Customer } from '../../domain/Customer';
import { CustomerAddress } from '../../domain/CustomerAddress';
import { CustomerBirthday } from '../../domain/CustomerBirthday';

export class CustomerCreate {
    constructor(private repository: CustomerRepository) { }

    async run(id: CustomerUid, address: CustomerAddress, birthday: CustomerBirthday): Promise<void> {
        const customer = Customer.create(id, birthday, address);

        await this.repository.create(customer);
    }
}