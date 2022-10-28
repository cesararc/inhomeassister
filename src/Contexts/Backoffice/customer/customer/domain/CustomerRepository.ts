import { PaginateNextToken } from "../shared/PaginateNextToken";
import { Customer } from "./Customer";

export interface CustomerRepository {
    listPaginate(limitOfDocuments: number, pageToken: string): Promise<PaginateNextToken<Customer>>;
}