import { UserRecordRepository } from '../../domain/UserRecordRepository';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordDisplayName } from '../../domain/UserRecordDisplayName';
import { UserRecordPhone } from '../../domain/UserRecordPhone';
import { UserRecordEmail } from '../../domain/UserRecordEmail';
import { UserRecord } from '../../domain/UserRecord';

export class UserRecordUpdate {
    constructor(private repository: UserRecordRepository) { }

    async run(
        uid: UserRecordUid,
        displayName: UserRecordDisplayName,
        phone: UserRecordPhone,
        email: UserRecordEmail): Promise<void> {

        const userRecord = UserRecord.update(uid, displayName, phone, email);

        await this.repository.accountUpdate(userRecord);
    }
}