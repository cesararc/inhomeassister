import { BackofficeCustomer } from "../domain/BackofficeCustomer";

export class BackofficeCustomerResponse {
  readonly customer: Array<BackofficeCustomer>;

  constructor(customer: Array<BackofficeCustomer>) {
    this.customer = customer;
  }
}