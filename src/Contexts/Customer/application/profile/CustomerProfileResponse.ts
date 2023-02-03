import { Customer } from '../../domain/Customer';

export class CustomerProfileResponse {
    customer: Customer;

    constructor(customer: Customer) {
        this.customer = customer;
    }
}