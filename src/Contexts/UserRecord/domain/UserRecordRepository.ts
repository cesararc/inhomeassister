import { UserRecord } from './UserRecord';
import { UserRecordUid } from './UserRecordUid';
import { UserRecordEmail } from './UserRecordEmail';
import { Nullable } from '../../Shared/domain/Nullable';

export interface UserRecordRepository {
    accountCreate(userRecord: UserRecord): Promise<void>;
    accountUpdate(userRecord: Partial<UserRecord>): Promise<void>;
    profile(userRecordUid: UserRecordUid): Promise<Nullable<UserRecord>>;
    accountRemove(userRecordUid: UserRecordUid): Promise<void>;
    accountDisable(userRecordUid: UserRecordUid): Promise<void>;
    accountEnable(userRecordUid: UserRecordUid): Promise<void>;
    accountResetPassword(email: UserRecordEmail): Promise<void>;
}