import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordRepository } from '../../domain/UserRecordRepository';

export class UserRecordProfile {
    constructor(private repository: UserRecordRepository) { }

    async run(uid: UserRecordUid) {
        return await this.repository.profile(uid);
    }
}