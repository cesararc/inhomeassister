import { UserRecord } from '../domain/UserRecord';
import { AuthRepository } from "../../Shared/infrastructure/persistence/AuthRepository";
import { UserRecordUid } from '../domain/UserRecordUid';
import { UserRecordRepository } from '../domain/UserRecordRepository';

export class UserRecordRepositoryFirebase extends AuthRepository<UserRecord> implements UserRecordRepository {

    async accountCreate(userRecord: UserRecord): Promise<void> {
        await this.persist(userRecord);
    }

    async profile(uid: UserRecordUid): Promise<UserRecord> {
        try {
            const data = await this.authentication().getUser(uid.value);

            const plainData = {
                id: data.uid,
                displayName: data.displayName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                claim: data.customClaims?.role
            };

            return UserRecord.fromPrimitives(plainData);
        } catch (error) {
            return null
        }

    }

    async accountRemove(uid: UserRecordUid): Promise<void> {
        try {
            await this.authentication().deleteUser(uid.value);
        } catch (error) { }
    }

    async accountDisable(userRecordUid: UserRecordUid): Promise<void> {
        await this.authentication().updateUser(userRecordUid.value, { disabled: true });
    }

    async accountEnable(userRecordUid: UserRecordUid): Promise<void> {
        await this.authentication().updateUser(userRecordUid.value, { disabled: false });
    }
}