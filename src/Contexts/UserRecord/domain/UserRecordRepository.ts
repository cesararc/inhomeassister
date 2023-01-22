import { UserRecord } from './UserRecord';
import { UserRecordUid } from './UserRecordUid';
import { UserRecordEmail } from './UserRecordEmail';
import { Nullable } from '../../Shared/domain/Nullable';

export interface UserRecordRepository {
    /**
    * Creates a new account user.
    * @param UserRecord - The properties to set on the
    *   new user record to be created.
    *
    * @returns A promise void
    */
    create(userRecord: UserRecord): Promise<void>;
    /**
    * Updates an existing user.
    * @param UserRecord - The properties to update on
    *   the provided user.
    *
    * @returns A promise void
    */
    update(userRecord: Partial<UserRecord>): Promise<void>;
    /**
    * Get profile for a user's account
    * @param UserRecordUid - Identifier user
    *
    * @returns A promise with user record data.
    */
    profile(userRecordUid: UserRecordUid): Promise<Nullable<UserRecord>>;
    /**
    * Gets a collection of user profiles.
    * Only a maximum of 100 identifiers may be supplied. If more than 100 identifiers are supplied,
    * this method throws a FirebaseAuthError.
    * @param UserRecordUid[] - Identifier user
    *
    * @returns A promise with user record data collection.
    */
    profileCollection(ids: UserRecordUid[]): Promise<UserRecord[]>;
    /**
    * Delete user account.
    * @param UserRecordUid - Identifier user
    *
    * @returns A promise void.
    */
    remove(userRecordUid: UserRecordUid): Promise<void>;
    /**
    * Disable user account.
    * @param UserRecordUid - Identifier user
    *
    * @returns A promise void.
    */
    disable(userRecordUid: UserRecordUid): Promise<void>;
    /**
    * Enable user account.
    * @param UserRecordUid - Identifier user
    *
    * @returns A promise void.
    */
    enable(userRecordUid: UserRecordUid): Promise<void>;
    /**
    * Generates a link to reset password, through the user's email.
    * @param UserRecordEmail - Identifier user
    *
    * @returns A promise string with link password reset.
    */
    resetPassword(email: UserRecordEmail): Promise<string>;
}