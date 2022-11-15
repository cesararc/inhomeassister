import { Customer } from "./Customer";
import { CustomerUid } from './CustomerUid';

export interface CustomerRepository {
    create(customer: Customer): Promise<void>;
    profile(uid: CustomerUid): Promise<Customer>;
    update(customer: Customer): Promise<void>;
}