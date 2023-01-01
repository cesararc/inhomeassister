import { Query } from "../../../Shared/domain/Query";
import { QueryHandler } from "../../../Shared/domain/QueryHandler";
import { ServiceProviderProfile } from './ServiceProviderProfile';
import { ServiceProviderProfileQuery } from "./ServiceProviderProfileQuery";
import { ServiceProviderUid } from "../../domain/ServiceProviderUid";
import { ServiceProviderProfileResponse } from "./ServiceProviderProfileResponse";

export class ServiceProviderProfileQueryHandler implements QueryHandler<ServiceProviderProfileQuery, ServiceProviderProfileResponse>{

    constructor(private profile: ServiceProviderProfile) { }

    subscribedTo(): Query {
        return ServiceProviderProfileQuery;
    }

    async handle(query: ServiceProviderProfileQuery): Promise<ServiceProviderProfileResponse> {
        const customer = await this.profile.run(new ServiceProviderUid(query.uid));

        return new ServiceProviderProfileResponse(customer);
    }
}
