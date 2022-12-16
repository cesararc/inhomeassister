import { UserRecord } from '../domain/UserRecord';
import { AuthRepository } from "../../Shared/infrastructure/persistence/AuthRepository";
import { UserRecordUid } from '../domain/UserRecordUid';
import { UserRecordRepository } from '../domain/UserRecordRepository';
import { Claim } from '../domain/UserRecordClaim';
import { UserRecordNotFound } from '../domain/UserRecordNotFound';

export class UserRecordRepositoryFirebase extends AuthRepository<UserRecord> implements UserRecordRepository {

    async create(userRecord: UserRecord): Promise<void> {
        await this.persist(userRecord);
    }

    async profile(uid: UserRecordUid): Promise<UserRecord> {
        const data = await this.authentication().getUser(uid.value);

        const plainData = {
            id: data.uid,
            displayName: data.displayName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            claim: "customer" as Claim
        };

        return UserRecord.fromPrimitives(plainData);
    }

    async remove(uid: UserRecordUid): Promise<void> {
        try {
            await this.authentication().deleteUser(uid.value);
        } catch (error) { }
    }
}