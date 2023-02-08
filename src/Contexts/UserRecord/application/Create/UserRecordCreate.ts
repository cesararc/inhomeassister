import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordDisplayName } from '../../domain/UserRecordDisplayName';
import { UserRecordPhone } from '../../domain/UserRecordPhone';
import { UserRecordEmail } from '../../domain/UserRecordEmail';
import { UserRecordPassword } from '../../domain/UserRecordPassword';
import { UserRecord } from '../../domain/UserRecord';
import { UserRecordClaim } from '../../domain/UserRecordClaim';

export class UserRecordCreate {
    constructor(private repository: UserRecordRepository) { }

    async run(uid: UserRecordUid, displayName: UserRecordDisplayName, phone: UserRecordPhone, email: UserRecordEmail, password: UserRecordPassword, claim: UserRecordClaim): Promise<void> {
        const userRecord = UserRecord.create(uid, displayName, phone, email, password, claim);

        await this.repository.create(userRecord);
    }
}