import { Query } from "../../../../Shared/domain/Query";
import { QueryHandler } from "../../../../Shared/domain/QueryHandler";
import { BackofficeCustomerResponse } from "./BackofficeCustomerResponse";
import { BackofficeCustomerList } from './BackofficeCustomerList';
import { BackofficeCustomerListQuery } from "./BackofficeCustomerListQuery";

export class BackofficeCustomerListQueryHandler
  implements QueryHandler<BackofficeCustomerListQuery, BackofficeCustomerResponse>
{
  constructor(private customerList: BackofficeCustomerList) { }
  subscribedTo(): Query {
    return BackofficeCustomerListQuery;
  }
  async handle(query: BackofficeCustomerListQuery): Promise<BackofficeCustomerResponse> {
    return new BackofficeCustomerResponse([])
  }
}
