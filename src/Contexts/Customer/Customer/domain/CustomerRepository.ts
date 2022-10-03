import { Customer } from "./Customer";

export interface CustomerRepository {
    create(customer: Customer): Promise<void>;
}