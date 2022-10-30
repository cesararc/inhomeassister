import { Customer } from "../../domain/BackofficeCustomer";

export class BackofficeCustomerResponse {
  readonly customer: Array<Customer>;

  constructor(customer: Array<Customer>) {
    this.customer = customer;
  }
}