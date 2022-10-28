import { Customer } from "../../domain/Customer";

export class BackofficeCustomerResponse {
    readonly customer: Array<Customer>;
  
    constructor(customer: Array<Customer>) {
      this.customer = customer;
    }
}