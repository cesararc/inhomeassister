import { PaginateNextToken } from "../../../Backoffice/customer/customer/shared/PaginateNextToken";
import { Customer } from "./Customer";

export interface CustomerRepository {
    create(customer: Customer): Promise<void>;
}