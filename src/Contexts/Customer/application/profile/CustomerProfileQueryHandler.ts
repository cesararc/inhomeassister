import { Query } from "../../../Shared/domain/Query";
import { QueryHandler } from "../../../Shared/domain/QueryHandler";
import { CustomerUid } from "../../domain/CustomerUid";
import { CustomerProfile } from "./CustomerProfile";
import { CustomerProfileQuery } from "./CustomerProfileQuery";
import { CustomerProfileResponse } from "./CustomerProfileResponse";

export class CustomerProfileQueryHandler implements QueryHandler<CustomerProfileQuery, CustomerProfileResponse>{

    constructor(private customerProfile: CustomerProfile) { }

    subscribedTo(): Query {
        return CustomerProfileQuery;
    }

    async handle(query: CustomerProfileQuery): Promise<CustomerProfileResponse> {
        const response = await this.customerProfile.run(new CustomerUid(query.customerUid));

        return new CustomerProfileResponse(response.userRecord, response.customer);
    }
}
