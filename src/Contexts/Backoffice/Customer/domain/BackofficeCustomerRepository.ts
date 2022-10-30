import { PaginateNextToken } from "../shared/PaginateNextToken";
import { Customer } from "./BackofficeCustomer";

export interface BackofficeCustomerRepository {
    listPaginate(limitOfDocuments: number, pageToken: string): Promise<PaginateNextToken<Customer>>;
}