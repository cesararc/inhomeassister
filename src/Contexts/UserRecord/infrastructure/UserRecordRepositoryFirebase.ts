import { UserRecord } from '../domain/UserRecord';
import { AuthRepository } from "../../Shared/infrastructure/persistence/AuthRepository";
import { UserRecordUid } from '../domain/UserRecordUid';
import { UserRecordRepository } from '../domain/UserRecordRepository';

export class UserRecordRepositoryFirebase extends AuthRepository<UserRecord> implements UserRecordRepository {

    async create(userRecord: UserRecord): Promise<void> {
        await this.persist(userRecord);
    }

    async profile(customerUid: UserRecordUid): Promise<UserRecord> {
        console.log({ customerUid })
        const customer = await this.authentication().getUser(customerUid.value);

        const plainData = { id: customer.uid, displayName: customer.displayName, email: customer.email, phoneNumber: customer.phoneNumber };

        return UserRecord.fromPrimitives(plainData);
    }
}