import { FirebaseRepository } from '../../Shared/infrastructure/persistence/FirebaseRepository';
import { Admin } from '../domain/Admin';
import { AdminRepository } from '../domain/AdminRepository';
import { AdminUid } from '../domain/AdminUid';

type CustomerPlainData = {
    uid: string;
    dni: string;
}

export class AdminRepositoryFirebase extends FirebaseRepository<Admin> implements AdminRepository {

    async create(admin: Admin): Promise<void> {
        await this.persist(admin);
    }

    async profile(uid: AdminUid): Promise<Admin> {
        const doc = await this.profileRetrieve<CustomerPlainData>(uid.value);

        return Admin.fromPrimitives(doc);
    }

    moduleName(): string {
        return "admin"
    }
}