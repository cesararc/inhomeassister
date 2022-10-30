import { Customer } from "../../domain/BackofficeCustomer";
import { CustomerRepository } from "../../domain/BackofficeCustomerRepository";
import { PaginateNextToken } from "../../../shared/PaginateNextToken";
import { BackofficeCustomerResponse } from "./BackofficeCustomerResponse";

export class CustomerList {
  constructor(private customerRepository: CustomerRepository) { }

  async run(
    maxResults: number,
    token: string
  ): Promise<PaginateNextToken<Customer>> {
    const { nextPageToken, results } =
      await this.customerRepository.listPaginate(maxResults, token);

    return { nextPageToken: nextPageToken, results: results };
  }
}
