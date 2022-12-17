import { CustomerRewardPointRepository } from '../domain/CustomerRewardPointRepository';
import { CustomerRewardPoint } from '../domain/CustomerRewardPoint';
import { CustomerRewardPointUid } from '../domain/CustomerRewardPointUid';
import { CustomerRewardPointTotal } from '../domain/CustomerRewardPointTotal';
import { FirebaseRepository } from '../../../Shared/infrastructure/persistence/FirebaseRepository';

export class CustomerRewardPointRepositoryFirebasey extends FirebaseRepository<CustomerRewardPoint> implements CustomerRewardPointRepository {

    async save(customerRewardPoint: CustomerRewardPoint) {
        this.persist(customerRewardPoint);
    }

    async search() {
        return new CustomerRewardPoint(new CustomerRewardPointUid(""), new CustomerRewardPointTotal(0));
    }

    moduleName() {
        return 'customer_reward'
    }
}