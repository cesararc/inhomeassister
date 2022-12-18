import { CustomerRewardPointRepository } from '../../domain/CustomerRewardPointRepository';
import { CustomerRewardPoint } from '../../domain/CustomerRewardPoint';

export class CustomerRewardPointIncrement {
    constructor(private repository: CustomerRewardPointRepository) { }

    async run(data: CustomerRewardPoint): Promise<void> {
        return await this.repository.increment(data);
    }
}