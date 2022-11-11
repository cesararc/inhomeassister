import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordDisplayName } from '../../domain/UserRecordDisplayName';
import { UserRecordPhone } from '../../domain/UserRecordPhone';
import { UserRecordEmail } from '../../domain/UserRecordEmail';
import { UserRecordPassword } from '../../domain/UserRecordPassword';
import { UserRecord } from '../../domain/UserRecord';

export class UserRecordCreate {
    constructor(private repository: UserRecordRepository) { }

    async run(id: UserRecordUid, displayName: UserRecordDisplayName, phone: UserRecordPhone, email: UserRecordEmail, password: UserRecordPassword): Promise<void> {

        const userRecord = UserRecord.create(id, displayName, phone, email, password);

        await this.repository.create(userRecord);
    }
}