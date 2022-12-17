import { UserRecord } from './UserRecord';
import { UserRecordUid } from './UserRecordUid';
import { UserRecordEmail } from './UserRecordEmail';

export interface UserRecordRepository {
    accountCreate(userRecord: UserRecord): Promise<void>;
    accountUpdate(userRecord: Partial<UserRecord>): Promise<void>;
    profile(userRecordUid: UserRecordUid): Promise<UserRecord>;
    accountRemove(userRecordUid: UserRecordUid): Promise<void>;
    accountDisable(userRecordUid: UserRecordUid): Promise<void>;
    accountEnable(userRecordUid: UserRecordUid): Promise<void>;
    accountResetPassword(email: UserRecordEmail): Promise<void>;
}