import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordEmail } from '../../domain/UserRecordEmail';

export class UserRecordResetPassword {
    constructor(private repository: UserRecordRepository) { }

    async run(email: UserRecordEmail): Promise<string> {
        const link = await this.repository.resetPassword(email);

        console.log(link);

        return link;
    }
}