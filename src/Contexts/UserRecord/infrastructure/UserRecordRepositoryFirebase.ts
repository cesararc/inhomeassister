import { UserRecord } from '../domain/UserRecord';
import { UserRecordUid } from '../domain/UserRecordUid';
import { UserRecordRepository } from '../domain/UserRecordRepository';
import { auth } from '../../../Apps/database';
import { UserRecordEmail } from '../domain/UserRecordEmail';
import firestore from '../../../Apps/database';

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

    async updateTransaction(userR: UserRecord): Promise<void> {
        const data = {
            ...(userR.email.value.length > 0 && { email: userR.email.value }),
            ...(userR.displayName.value.length > 0 && { displayName: userR.displayName.value }),
            ...(userR.phoneNumber.value.length > 0 && { phoneNumber: userR.phoneNumber.value }),
        };

        const ref = firestore.collection("contract");

        const contractCustomer = await ref.where("customer.uid", "==", userR.uid.value).get();
        if (!contractCustomer.empty) {
            contractCustomer.docs.map(async function (item) {
                const oldValues = item.data()["customer"];
                await ref.doc(item.id).update({ customer: { ...oldValues, ...data } });
            });
        }

        const contractSeller = await ref.where("seller.uid", "==", userR.uid.value).get();
        if (!contractSeller.empty) {
            contractSeller.docs.map(async function (item) {
                const oldValues = item.data()["seller"];
                await ref.doc(item.id).update({ seller: { ...oldValues, ...data } });
            })
        }

        const contractServiceProvider = await ref.where("service_provider.uid", "==", userR.uid.value).get();
        if (!contractServiceProvider.empty) {
            contractServiceProvider.docs.map(async function (item) {
                const oldValues = item.data()["serviceProvider"];
                await ref.doc(item.id).update({ serviceProvider: { ...oldValues, ...data } });
            })
        }
    }

    async profile(uid: UserRecordUid): Promise<UserRecord> {
        try {
            const data = await auth.getUser(uid.value);

            const plainData = {
                uid: data.uid,
                displayName: data.displayName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                claim: data.customClaims?.role
            };

            return UserRecord.fromPrimitives(plainData);
        } catch (error) {
            return null;
        }
    }

    async profileCollection(ids: UserRecordUid[]): Promise<Array<UserRecord>> {
        const identifiers = ids.map(item => ({ uid: item.value }));

        const results = await auth.getUsers(identifiers);

        const users = results.users.map(item => (
            {
                uid: item.uid,
                displayName: item.displayName,
                email: item.email,
                phoneNumber: item.phoneNumber,
                claim: item.customClaims?.role
            }));

        return users.map(item => UserRecord.fromPrimitives(item));
    }

    async delete(uid: UserRecordUid): Promise<void> {
        try {
            await auth.deleteUser(uid.value);
        } catch (error) { }
    }

    async disable(uid: UserRecordUid): Promise<void> {
        await auth.updateUser(uid.value, { disabled: true });
    }

    async enable(uid: UserRecordUid): Promise<void> {
        await auth.updateUser(uid.value, { disabled: false });
    }

    async resetPassword(email: UserRecordEmail): Promise<string> {
        const settings = {
            url: "https://inhomeassiter.firebaseapp.com/",
            handleCodeInApp: true,
        };

        return await auth.generatePasswordResetLink(email.value, settings);
    }
}