import { CustomerRepository } from "../domain/CustomerRepository";
import { Customer } from '../domain/Customer';
import { CustomerUid } from '../domain/CustomerUid';
import { FirebaseRepository } from '../../../Shared/infrastructure/persistence/FirebaseRepository';

type CustomerPlainData = {
    uid: string;
    birthday: Date;
    address: string;
    dni: string;
}

export class CustomerRepositoryFirebase extends FirebaseRepository<Customer> implements CustomerRepository {

    async create(customer: Customer): Promise<void> {
        await this.persist(customer);
    }

    async update(customer: Customer): Promise<void> {
        try {
            const collection = this.collection().doc(customer.toPrimitives().uid);

            await collection.update(customer.toPrimitives());

        } catch (error) {
            return null;
        }
    }

    async profile(uid: CustomerUid): Promise<Customer> {
        const doc = await this.profileRetrieve<CustomerPlainData>(uid.value);

        return Customer.fromPrimitives(doc);
    }

    moduleName(): string {
        return "customer"
    }
}