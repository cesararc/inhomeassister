import { UserRecordNotFound } from '../../domain/UserRecordNotFound';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordRepository } from '../../domain/UserRecordRepository';

export class userRecordProfile {
    constructor(private repository: UserRecordRepository) { }

    async run(uid: UserRecordUid) {
        const userRecord = await this.repository.profile(uid);
        if (!userRecord) {
            throw new UserRecordNotFound();
        }

        return userRecord;
    }
}