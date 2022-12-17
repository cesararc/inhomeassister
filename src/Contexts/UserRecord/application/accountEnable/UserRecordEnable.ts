import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordUid } from '../../domain/UserRecordUid';

export class UserRecordEnable {
    constructor(private repository: UserRecordRepository) { }

    async run(userRecordUid: UserRecordUid) {
        return await this.repository.accountEnable(userRecordUid);
    }
}