import { UserRecord } from './UserRecord';
import { UserRecordUid } from './UserRecordUid';
import { UserRecordEmail } from './UserRecordEmail';
import { Nullable } from '../../Shared/domain/Nullable';

export interface UserRecordRepository {
    create(userRecord: UserRecord): Promise<void>;
    update(userRecord: Partial<UserRecord>): Promise<void>;
    profile(userRecordUid: UserRecordUid): Promise<Nullable<UserRecord>>;
    remove(userRecordUid: UserRecordUid): Promise<void>;
    disable(userRecordUid: UserRecordUid): Promise<void>;
    enable(userRecordUid: UserRecordUid): Promise<void>;
    resetPassword(email: UserRecordEmail): Promise<string>;
}