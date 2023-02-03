import { Admin } from "./Admin";
import { AdminUid } from './AdminUid';

export interface AdminRepository {
    create(admin: Admin): Promise<void>;
    profile(uid: AdminUid): Promise<Admin>;
}