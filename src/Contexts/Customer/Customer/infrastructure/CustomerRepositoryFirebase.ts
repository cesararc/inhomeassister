import { CustomerRepository } from "../domain/CustomerRepository";
import { Customer } from '../domain/Customer';
import { CustomerUid } from '../domain/CustomerUid';
import { FirebaseRepository } from '../../../Shared/infrastructure/persistence/FirebaseRepository';
import { UserRecordUid } from '../../../UserRecord/domain/UserRecordUid';
import { CustomerBirthday } from '../domain/CustomerBirthday';
import { CustomerAddress } from '../domain/CustomerAddress';

export class CustomerRepositoryFirebase extends FirebaseRepository<Customer> implements CustomerRepository {

    async create(customer: Customer): Promise<void> {
        await this.persist(customer);
    }

    async profile(customerUid: CustomerUid): Promise<Customer> {
        //     // const customer = await this.collection().doc(customerUid.value).get();

        //     // const plainData = { id: customer.uid, displayName: customer.displayName, email: customer.email, phoneNumber: customer.phoneNumber };

        //     // return Customer.fromPrimitives(plainData);
        //    // return Customer.create()
        return new Customer(
            new UserRecordUid(""),
            new CustomerUid(""),
            new CustomerBirthday(new Date()),
            new CustomerAddress("")
        );
    }

    moduleName(): string {
        return "customer"
    }
}