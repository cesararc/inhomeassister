import { CustomerRepository } from '../../domain/CustomerRepository';
import { CustomerUid } from '../../domain/CustomerUid';
import { Customer } from '../../domain/Customer';
import { CustomerAddress } from '../../domain/CustomerAddress';
import { CustomerBirthday } from '../../domain/CustomerBirthday';
import { CustomerDni } from '../../domain/CustomerDni';

export class CustomerUpdate {
    constructor(private repository: CustomerRepository) { }

    async run(uid: CustomerUid, address: CustomerAddress, birthday: CustomerBirthday, dni: CustomerDni): Promise<void> {
        const customer = Customer.update(uid, birthday, address, dni);

        await this.repository.create(customer);
    }
}