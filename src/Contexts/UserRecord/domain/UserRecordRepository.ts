import { UserRecord } from './UserRecord';
import { UserRecordUid } from './UserRecordUid';

export interface UserRecordRepository {
    create(userRecord: UserRecord): Promise<void>;
    profile(userRecordUid: UserRecordUid): Promise<UserRecord>;
    remove(userRecordUid: UserRecordUid): Promise<void>;
}