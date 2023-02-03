
import { AdminProfileQuery } from './AdminProfileQuery';
import { Query } from '../../../Shared/domain/Query';
import { AdminProfile } from './AdminProfile';
import { AdminUid } from "../../domain/AdminUid";
import { QueryHandler } from '../../../Shared/domain/QueryHandler';
import { AdminProfileResponse } from './AdminProfileResponse';

export class AdminProfileQueryHandler implements QueryHandler<AdminProfileQuery, AdminProfileResponse>{

    constructor(private adminProfile: AdminProfile) { }

    subscribedTo(): Query {
        return AdminProfileQuery;
    }

    async handle(query: AdminProfileQuery): Promise<AdminProfileResponse> {
        const customer = await this.adminProfile.run(new AdminUid(query.uid));

        return new AdminProfileResponse(customer);
    }
}
