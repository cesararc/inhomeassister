import { CustomerRepository } from "../domain/CustomerRepository";
import { Customer } from '../domain/Customer';
import { CustomerUid } from '../domain/CustomerUid';
import { CustomerDni } from '../domain/CustomerDni';
import firestore from '../../../Apps/database';
import { Nullable } from '../../Shared/domain/Nullable';

type CustomerPlainData = {
    uid: string;
    birthday: string;
    address: string;
    dni: string;
}

export class CustomerRepositoryFirebase implements CustomerRepository {

    async create(customer: Customer): Promise<void> {
        const collection = this.collection().doc(customer.toPrimitives().uid);
        const document = { ...customer.toPrimitives() };

        await collection.set(document);
    }

    async update(customer: Customer): Promise<void> {
        const collection = this.collection().doc(customer.toPrimitives().uid);

        await collection.update(customer.toPrimitives());
    }

    async profile(uid: CustomerUid): Promise<Customer> {
        const reference = await this.collection().doc(uid.value).get();

        const document = reference.data() as CustomerPlainData;

        return Customer.fromPrimitives(document);
    }

    async matching(criteria: CustomerDni): Promise<Nullable<CustomerUid>> {
        const result = await this.collection().where("dni", "==", criteria.value).get();

        if (result.empty) return null;

        const reference = result.docs[0];
        const document = reference.data() as CustomerPlainData;

        return document ? new CustomerUid(document.uid) : null;
    }

    protected collection() {
        return firestore.collection(this.moduleName());
    }

    moduleName(): string {
        return "customer"
    }
}