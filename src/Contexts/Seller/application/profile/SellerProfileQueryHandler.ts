import { Query } from '../../../Shared/domain/Query';
import { SellerProfile } from './SellerProfile';
import { SellerProfileQuery } from './SellerProfileQuery';
import { QueryHandler } from '../../../Shared/domain/QueryHandler';
import { SellerProfileResponse } from './SellerProfileResponse';
import { SellerUid } from '../../domain/SellerUid';

export class SellerProfileQueryHandler implements QueryHandler<SellerProfileQuery, SellerProfileResponse>{

    constructor(private profile: SellerProfile) { }

    subscribedTo(): Query {
        return SellerProfileQuery;
    }

    async handle(query: SellerProfileQuery): Promise<SellerProfileResponse> {
        const customer = await this.profile.run(new SellerUid(query.uid));

        return new SellerProfileResponse(customer);
    }
}
