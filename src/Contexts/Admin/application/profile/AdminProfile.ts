import { AdminRepository } from '../../domain/AdminRepository';
import { AdminUid } from '../../domain/AdminUid';
import { AdminNotFound } from '../../domain/AdminNotFound';

export class AdminProfile {
    constructor(private repository: AdminRepository) { }

    async run(customerUid: AdminUid) {
        const customer = await this.repository.profile(customerUid);

        if (!customer) {
            throw new AdminNotFound();
        }

        return customer;
    }
}