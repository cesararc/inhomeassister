import { Admin } from '../../domain/Admin';

export class AdminProfileResponse {
    admin: Admin;

    constructor(admin: Admin) {
        this.admin = admin;
    }
}