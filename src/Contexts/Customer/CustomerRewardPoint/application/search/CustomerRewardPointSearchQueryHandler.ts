import { Query } from "../../../../Shared/domain/Query";
import { QueryHandler } from "../../../../Shared/domain/QueryHandler";
import { CustomerRewardPointUid } from "../../domain/CustomerRewardPointUid";
import { CustomerRewardPointSearchQuery } from "./CustomerRewardPointSearchQuery";
import { CustomerRewardPointSearch } from './CustomerRewardPointSearch';
import { CustomerRewardPointSearchResponse } from './CustomerRewardPointSearchResponse';

export class CustomerRewardPointSearchQueryHandler implements QueryHandler<CustomerRewardPointSearchQuery, CustomerRewardPointSearchResponse>{

    constructor(private search: CustomerRewardPointSearch) { }

    subscribedTo(): Query {
        return CustomerRewardPointSearchQuery;
    }

    async handle(query: CustomerRewardPointSearchQuery): Promise<CustomerRewardPointSearchResponse> {
        const result = await this.search.run(new CustomerRewardPointUid(query.uid));

        return new CustomerRewardPointSearchResponse(result);
    }
}
