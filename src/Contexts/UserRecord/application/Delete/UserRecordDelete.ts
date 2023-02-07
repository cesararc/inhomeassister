import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordUid } from '../../domain/UserRecordUid';

export class UserRecordDelete {
    constructor(private repository: UserRecordRepository) { }

    async run(uid: UserRecordUid) {
        await this.repository.delete(uid);
    }
}