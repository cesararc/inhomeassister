import { Admin } from '../domain/Admin';
import { AdminRepository } from '../domain/AdminRepository';
import { AdminUid } from '../domain/AdminUid';
import firestore from '../../../Apps/database';

type CustomerPlainData = {
    uid: string;
    dni: string;
}

export class AdminRepositoryFirebase implements AdminRepository {

    async create(admin: Admin): Promise<void> {
        const collection = this.collection().doc(admin.toPrimitives().uid);
        const document = { ...admin.toPrimitives() };

        await collection.set(document);
    }

    async profile(uid: AdminUid): Promise<Admin> {
        const reference = await this.collection().doc(uid.value).get();

        const document = reference.data() as CustomerPlainData;

        return Admin.fromPrimitives(document);

    }

    protected collection() {
        return firestore.collection(this.moduleName());
    }

    moduleName(): string {
        return "admin"
    }
}