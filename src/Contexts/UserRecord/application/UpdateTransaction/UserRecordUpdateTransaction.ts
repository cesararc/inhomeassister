import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecord } from '../../domain/UserRecord';

export class UserRecordUpdateTransaction {
    constructor(private repository: UserRecordRepository) { }

    async run(userR: Partial<UserRecord>): Promise<void> {
        return await this.repository.updateTransaction(userR);
    }
}