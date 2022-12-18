import { CustomerRewardPointRepository } from '../../domain/CustomerRewardPointRepository';
import { CustomerRewardPoint } from '../../domain/CustomerRewardPoint';
import { CustomerRewardPointUid } from '../../domain/CustomerRewardPointUid';
import { CustomerRewardPointAmount } from '../../domain/CustomerRewardPointAmount';

export class CustomerRewardPointIncrement {
    constructor(private repository: CustomerRewardPointRepository) { }

    async run(data: CustomerRewardPoint): Promise<void> {
        const counter = await this.repository.search(data.uid);
        if (!counter) {
            return await this.repository.save(this.initializeCounter(data.uid, data.amount));
        }

        counter.increment(data.amount);

        return await this.repository.save(counter);
    }

    private initializeCounter(uid: CustomerRewardPointUid, amount: CustomerRewardPointAmount) {
        return CustomerRewardPoint.initialize(uid, amount);
    }
}