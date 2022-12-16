import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { UserRecordDisplayName } from './UserRecordDisplayName';
import { UserRecordPhone } from './UserRecordPhone';
import { UserRecordEmail } from './UserRecordEmail';
import { UserRecordUid } from './UserRecordUid';
import { UserRecordPassword } from './UserRecordPassword';
import { UserRecordClaim, Claim } from './UserRecordClaim';

export class UserRecord extends AggregateRoot {

    readonly uid: UserRecordUid;
    readonly displayName: UserRecordDisplayName;
    readonly phoneNumber: UserRecordPhone;
    readonly email: UserRecordEmail;
    readonly password: UserRecordPassword;
    readonly claim: UserRecordClaim;

    constructor(uid: UserRecordUid, displayName: UserRecordDisplayName, phone: UserRecordPhone, email: UserRecordEmail, claim: UserRecordClaim, password?: UserRecordPassword) {
        super();
        this.uid = uid;
        this.displayName = displayName;
        this.phoneNumber = phone;
        this.email = email;
        this.password = password;
        this.claim = claim;
    }

    static create(uid: UserRecordUid, displayName: UserRecordDisplayName, phoneNumber: UserRecordPhone, email: UserRecordEmail, password: UserRecordPassword, claim: UserRecordClaim): UserRecord {

        const userRecord = new UserRecord(uid, displayName, phoneNumber, email, claim, password);

        return userRecord;
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            displayName: this.displayName.value,
            email: this.email.value,
            phoneNumber: this.phoneNumber.value,
            password: this.password.value,
        }
    }

    static fromPrimitives(plainData: { id: string; displayName: string; email: string; phoneNumber: string; claim: Claim }) {
        return new UserRecord(
            new UserRecordUid(plainData.id),
            new UserRecordDisplayName(plainData.displayName),
            new UserRecordPhone(plainData.phoneNumber),
            new UserRecordEmail(plainData.email),
            new UserRecordClaim(plainData.claim)
        );
    }
}