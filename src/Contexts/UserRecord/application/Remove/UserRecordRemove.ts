import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordUid } from '../../domain/UserRecordUid';

export class UserRecordRemove {
    constructor(private repository: UserRecordRepository) { }

    async run(uid: UserRecordUid) {
        await this.repository.remove(uid);
    }
}