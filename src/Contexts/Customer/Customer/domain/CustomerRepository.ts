import { Customer } from "./Customer";
import { CustomerUid } from './CustomerUid';

export interface CustomerRepository {
    create(customer: Customer): Promise<void>;
    profile(customerUid: CustomerUid): Promise<Customer>;
}