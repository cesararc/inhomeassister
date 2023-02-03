
import { AdminRepository } from '../../domain/AdminRepository';
import { AdminUid } from '../../domain/AdminUid';
import { AdminDNI } from '../../domain/AdminDNI';
import { Admin } from '../../domain/Admin';

export class AdminCreate {
    constructor(private repository: AdminRepository) { }

    async run(id: AdminUid, dni: AdminDNI): Promise<void> {

        const admin = Admin.create(id, dni);

        await this.repository.create(admin);

    }
}