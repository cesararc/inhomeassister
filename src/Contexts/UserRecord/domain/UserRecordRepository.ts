import { UserRecord } from './UserRecord';
import { UserRecordUid } from './UserRecordUid';

export interface UserRecordRepository {
    accountCreate(userRecord: UserRecord): Promise<void>;
    profile(userRecordUid: UserRecordUid): Promise<UserRecord>;
    accountRemove(userRecordUid: UserRecordUid): Promise<void>;
    accountDisable(userRecordUid: UserRecordUid): Promise<void>;
    accountEnable(userRecordUid: UserRecordUid): Promise<void>;
}