import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordUid } from '../../domain/UserRecordUid';

export class UserRecordDisable {
    constructor(private repository: UserRecordRepository) { }

    async run(userRecordUid: UserRecordUid) {
        return await this.repository.disable(userRecordUid);
    }
}