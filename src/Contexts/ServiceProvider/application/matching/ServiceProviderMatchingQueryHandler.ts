import { Query } from "../../../Shared/domain/Query";
import { QueryHandler } from "../../../Shared/domain/QueryHandler";
import { ServiceProviderDni } from "../../domain/ServiceProviderDni";
import { ServiceProviderMatching } from './ServiceProviderMatching';
import { ServiceProviderMatchingQuery } from './ServiceProviderMatchingQuery';
import { ServiceProviderMatchingResponse } from './ServiceProviderMatchingResponse';

export class ServiceProviderMatchingQueryHandler implements QueryHandler<ServiceProviderMatchingQuery, ServiceProviderMatchingResponse>{

    constructor(private matching: ServiceProviderMatching) { }

    subscribedTo(): Query {
        return ServiceProviderMatchingQuery;
    }

    async handle(query: ServiceProviderMatchingQuery): Promise<ServiceProviderMatchingResponse> {
        const response = await this.matching.run(new ServiceProviderDni(query.param));

        return new ServiceProviderMatchingResponse(response.serviceProvider, response.userRecord);
    }
}
