import { Query } from "../../../../Shared/domain/Query";
import { QueryHandler } from "../../../../Shared/domain/QueryHandler";
import { BackofficeCustomerList } from './BackofficeCustomerList';
import { BackofficeCustomerListQuery } from "./BackofficeCustomerListQuery";
import { BackofficeCustomerResponse } from '../BackofficeCustomerResponse';

export class BackofficeCustomerListQueryHandler implements QueryHandler<BackofficeCustomerListQuery, BackofficeCustomerResponse>{

  constructor(private customerList: BackofficeCustomerList) { }

  subscribedTo(): Query {
    return BackofficeCustomerListQuery;
  }

  async handle(query: BackofficeCustomerListQuery): Promise<BackofficeCustomerResponse> {

    const { results, nextPageToken } = await this.customerList.run(query.limitOfDocuments, query.token);

    return new BackofficeCustomerResponse(results, nextPageToken);

  }
}
