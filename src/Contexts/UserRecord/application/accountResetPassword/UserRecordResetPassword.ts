import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordEmail } from '../../domain/UserRecordEmail';

export class UserRecordResetPassword {
    constructor(private repository: UserRecordRepository) { }

    async run(email: UserRecordEmail): Promise<void> {
        return await this.repository.accountResetPassword(email);
    }
}