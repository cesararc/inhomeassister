import { Admin } from "./Admin";
import { AdminUid } from './AdminUid';

export interface AdminRepository {
    /**
    * Create admin
    * @param admin - Admin entitie
    *
    * @returns A promise void.
    */
    create(admin: Admin): Promise<void>;
    /**
    * Profile admin
    * @param uid - Admin uid reference
    *
    * @returns A promise admin entitie.
    */
    profile(uid: AdminUid): Promise<Admin>;
}