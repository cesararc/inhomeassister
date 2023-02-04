import { Customer } from '../../domain/Customer';

export class CustomerMatchingResponse {
    customer: Customer;

    constructor(customer: Customer) {
        this.customer = customer;
    }
}