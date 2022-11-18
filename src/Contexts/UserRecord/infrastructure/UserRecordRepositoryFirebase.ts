import { UserRecord } from '../domain/UserRecord';
import { AuthRepository } from "../../Shared/infrastructure/persistence/AuthRepository";
import { UserRecordUid } from '../domain/UserRecordUid';
import { UserRecordRepository } from '../domain/UserRecordRepository';
import { Claim } from '../domain/UserRecordClaim';

export class UserRecordRepositoryFirebase extends AuthRepository<UserRecord> implements UserRecordRepository {

    async create(userRecord: UserRecord): Promise<void> {
        await this.persist(userRecord);
    }

    async profile(customerUid: UserRecordUid): Promise<UserRecord> {
        const data = await this.authentication().getUser(customerUid.value);

        const plainData = {
            id: data.uid,
            displayName: data.displayName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            claim: "customer" as Claim
        };

        return UserRecord.fromPrimitives(plainData);

    }
}