import { Query } from "../../../Shared/domain/Query";
import { QueryHandler } from "../../../Shared/domain/QueryHandler";
import { CustomerMatchingQuery } from './CustomerMatchingQuery';
import { CustomerMatchingResponse } from './CustomerMatchingResponse';
import { CustomerMatching } from './CustomerMatching';
import { CustomerDni } from '../../domain/CustomerDni';

export class CustomerMatchingQueryHandler implements QueryHandler<CustomerMatchingQuery, CustomerMatchingResponse>{

    constructor(private matching: CustomerMatching) { }

    subscribedTo(): Query {
        return CustomerMatchingQuery;
    }

    async handle(query: CustomerMatchingQuery): Promise<CustomerMatchingResponse> {
        const customer = await this.matching.run(new CustomerDni(query.param));

        return new CustomerMatchingResponse(customer);
    }
}
