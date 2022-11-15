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

    async profile(customerUid: CustomerUid): Promise<Customer> {
        const reference = await this.collection().doc(customerUid.value).get();

        const doc = reference.data() as CustomerPlainData;

        const data = {
            uid: doc.uid,
            address: doc.address,
            birthday: doc.birthday,
            dni: doc.dni
        }

        return Customer.fromPrimitives(data);
    }

    moduleName(): string {
        return "customer"
    }
}