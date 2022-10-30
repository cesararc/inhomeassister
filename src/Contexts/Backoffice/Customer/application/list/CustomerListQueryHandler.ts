import { Query } from "../../../../Shared/domain/Query";
import { QueryHandler } from "../../../../Shared/domain/QueryHandler";
import { BackofficeCustomerResponse } from "./BackofficeCustomerResponse";
import { CustomerList } from "./CustomerList";
import { CustomerListQuery } from "./CustomerListQuery";

export class CustomerListQueryHandler
  implements QueryHandler<CustomerListQuery, BackofficeCustomerResponse>
{
  constructor(private customerList: CustomerList) { }
  subscribedTo(): Query {
    return CustomerListQuery;
  }
  async handle(query: CustomerListQuery): Promise<BackofficeCustomerResponse> {
    return new BackofficeCustomerResponse([])
  }
}
