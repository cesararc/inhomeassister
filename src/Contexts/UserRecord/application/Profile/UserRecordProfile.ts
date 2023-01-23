import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordNotFound } from '../../domain/UserRecordNotFound';

export class UserRecordProfile {
    constructor(private repository: UserRecordRepository) { }

    async run(uid: UserRecordUid) {
        const profile = await this.repository.profile(uid);
        if (!profile) throw new UserRecordNotFound();

        return profile;
    }
}