import { CustomerRewardPointRepository } from '../../domain/CustomerRewardPointRepository';

export class CustomerRewardPointSearch {
    constructor(private repository: CustomerRewardPointRepository) { }

    async run() {
        await this.repository.search();
    }
}