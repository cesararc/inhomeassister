import { CustomerRewardPointRepository } from '../domain/CustomerRewardPointRepository';
import { CustomerRewardPoint } from '../domain/CustomerRewardPoint';
import { CustomerRewardPointUid } from '../domain/CustomerRewardPointUid';
import { FirebaseRepository } from '../../Shared/infrastructure/persistence/FirebaseRepository';

export class CustomerRewardPointRepositoryFirebase extends FirebaseRepository<CustomerRewardPoint> implements CustomerRewardPointRepository {

    async save(customerRewardPoint: CustomerRewardPoint): Promise<void> {
        this.persist(customerRewardPoint);
    }

    async search(uid: CustomerRewardPointUid) {
        const reference = await this.collection().doc(uid.value).get();
        const doc = reference.data() as { uid: string; amount: number };

        return doc ? CustomerRewardPoint.fromPrimitives(doc) : null;
    }

    moduleName() {
        return 'customer_reward'
    }
}