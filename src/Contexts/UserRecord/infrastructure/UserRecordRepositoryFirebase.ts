import { UserRecord } from '../domain/UserRecord';
import { UserRecordUid } from '../domain/UserRecordUid';
import { UserRecordRepository } from '../domain/UserRecordRepository';
import { auth } from '../../../Apps/database';
import { UserRecordEmail } from '../domain/UserRecordEmail';

export class UserRecordRepositoryFirebase implements UserRecordRepository {

    async create(userR: UserRecord): Promise<void> {

        await auth.createUser(userR.toPrimitives());

        const uid = userR.toPrimitives().uid;
        const role = userR.toPrimitives().claim;
        await auth.setCustomUserClaims(uid, { role });
    }

    async update(userR: UserRecord): Promise<void> {
        const data = {
            ...(userR.email.value.length > 0 && { email: userR.email.value }),
            ...(userR.displayName.value.length > 0 && { displayName: userR.displayName.value }),
            ...(userR.phoneNumber.value.length > 0 && { phoneNumber: userR.phoneNumber.value }),
        };

        await auth.updateUser(userR.uid.value, data);
    }

    async profile(uid: UserRecordUid): Promise<UserRecord> {
        const data = await auth.getUser(uid.value);

        const plainData = {
            id: data.uid,
            displayName: data.displayName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            claim: data.customClaims?.role
        };

        return data ? UserRecord.fromPrimitives(plainData) : null;
    }

    async remove(uid: UserRecordUid): Promise<void> {
        try {
            await auth.deleteUser(uid.value);
        } catch (error) { }
    }

    async disable(userRecordUid: UserRecordUid): Promise<void> {
        await auth.updateUser(userRecordUid.value, { disabled: true });
    }

    async enable(userRecordUid: UserRecordUid): Promise<void> {
        await auth.updateUser(userRecordUid.value, { disabled: false });
    }

    async resetPassword(email: UserRecordEmail): Promise<void> {
        const actionCodeSettings = {
            url: "https://example.com/ui",
            handleCodeInApp: true,
            iOS: {
                bundleId: 'com.example.ios',
            },
            android: {
                packageName: 'com.example.android',
                installApp: true,
                minimumVersion: '12',
            },
            dynamicLinkDomain: 'coolapp.page.link',
        };
        const response = await auth.generatePasswordResetLink(email.value, actionCodeSettings);
        console.log({ response })
    }
}