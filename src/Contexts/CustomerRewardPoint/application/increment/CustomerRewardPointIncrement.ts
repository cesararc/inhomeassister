import { CustomerRewardPointRepository } from '../../domain/CustomerRewardPointRepository';
import { CustomerRewardPoint } from '../../domain/CustomerRewardPoint';
import { CustomerRewardPointUid } from '../../domain/CustomerRewardPointUid';
import { CustomerRewardPointAmount } from '../../domain/CustomerRewardPointAmount';
import { EventBus } from '../../../Shared/domain/EventBus';

export class CustomerRewardPointIncrement {
    constructor(private repository: CustomerRewardPointRepository, private eventBus: EventBus) { }

    async run(data: CustomerRewardPoint): Promise<void> {
        const counter = await this.repository.search(data.uid);

        if (!counter) {
            const instance = this.initializeCounter(data.uid, data.amount);
            await this.repository.save(instance);

            return await this.eventBus.publish(instance.pullDomainEvents());
        }

        counter.increment(data.amount);
        await this.repository.save(counter);

        return await this.eventBus.publish(counter.pullDomainEvents());
    }

    private initializeCounter(uid: CustomerRewardPointUid, amount: CustomerRewardPointAmount) {
        return CustomerRewardPoint.initialize(uid, amount);
    }
}