import { QueryHandler } from '../../../Shared/domain/QueryHandler';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordProfileQuery } from './UserRecordProfileQuery';
import { UserRecordProfileResponse } from './UserRecordProfileResponse';
import { Query } from '../../../Shared/domain/Query';
import { UserRecordProfile } from './UserRecordProfile';



export class UserRecordProfileQueryHandler implements QueryHandler<UserRecordProfileQuery, UserRecordProfileResponse> {

    constructor(private userRecordProfile: UserRecordProfile) { }

    subscribedTo(): Query {
        return UserRecordProfileQuery;
    }

    async handle(query: UserRecordProfileQuery) {
        const userRecord = await this.userRecordProfile.run(new UserRecordUid(query.userRecordUid));

        return new UserRecordProfileResponse(userRecord);
    }

}
