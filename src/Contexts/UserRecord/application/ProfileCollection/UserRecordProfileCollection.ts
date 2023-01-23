import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecord } from '../../domain/UserRecord';

export class UserRecordProfileCollection {
    constructor(private repository: UserRecordRepository) { }

    async run(ids: UserRecordUid[]): Promise<UserRecord[]> {
        return await this.repository.profileCollection(ids);
    }
}