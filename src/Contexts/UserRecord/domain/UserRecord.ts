import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { UserRecordDisplayName } from './UserRecordDisplayName';
import { UserRecordPhone } from './UserRecordPhone';
import { UserRecordEmail } from './UserRecordEmail';
import { UserRecordUid } from './UserRecordUid';
import { UserRecordPassword } from './UserRecordPassword';

export class UserRecord extends AggregateRoot {

    readonly id: UserRecordUid;
    readonly displayName: UserRecordDisplayName;
    readonly phoneNumber: UserRecordPhone;
    readonly email: UserRecordEmail;
    readonly password: UserRecordPassword;

    constructor(id: UserRecordUid, displayName: UserRecordDisplayName, phone: UserRecordPhone, email: UserRecordEmail, password?: UserRecordPassword) {
        super();
        this.id = id;
        this.displayName = displayName;
        this.phoneNumber = phone;
        this.email = email;
        this.password = password;
    }

    static create(uid: UserRecordUid, displayName: UserRecordDisplayName, phoneNumber: UserRecordPhone, email: UserRecordEmail, password: UserRecordPassword): UserRecord {

        const userRecord = new UserRecord(uid, displayName, phoneNumber, email, password);

        return userRecord;
    }

    toPrimitives() {
        return {
            uid: this.id.value,
            displayName: this.displayName.value,
            email: this.email.value,
            phoneNumber: this.phoneNumber.value,
            password: this.password.value
        }
    }

    static fromPrimitives(plainData: { id: string; displayName: string; email: string; phoneNumber: string; }) {
        return new UserRecord(
            new UserRecordUid(plainData.id),
            new UserRecordDisplayName(plainData.displayName),
            new UserRecordPhone(plainData.phoneNumber),
            new UserRecordEmail(plainData.email)
        );
    }
}