import { CustomerRewardPointRepository } from '../domain/CustomerRewardPointRepository';
import { CustomerRewardPoint } from '../domain/CustomerRewardPoint';
import { CustomerRewardPointUid } from '../domain/CustomerRewardPointUid';
import { FirebaseRepository } from '../../../Shared/infrastructure/persistence/FirebaseRepository';

interface CustomerRewardPointPlainData {
    uid: string;
    amount: number;
}

export class CustomerRewardPointRepositoryFirebase extends FirebaseRepository<CustomerRewardPoint> implements CustomerRewardPointRepository {

    async increment(customerRewardPoint: CustomerRewardPoint): Promise<void> {
        try {
            const collection = this.collection().doc(customerRewardPoint.toPrimitives().uid);

            //await collection.update({total: });

        } catch (error) {
            return null;
        }
    }

    async search(uid: CustomerRewardPointUid) {
        const reference = await this.collection().doc(uid.value).get();

        const doc = reference.data() as CustomerRewardPointPlainData;

        return CustomerRewardPoint.fromPrimitives(doc);
    }

    moduleName() {
        return 'customer_reward'
    }
}