import { CustomerRewardPointRepository } from '../domain/CustomerRewardPointRepository';
import { CustomerRewardPoint } from '../domain/CustomerRewardPoint';
import { CustomerRewardPointUid } from '../domain/CustomerRewardPointUid';
import firestore from '../../../Apps/database';

export class CustomerRewardPointRepositoryFirebase implements CustomerRewardPointRepository {

    async save(customerRewardPoint: CustomerRewardPoint): Promise<void> {

        const collection = this.collection().doc(customerRewardPoint.toPrimitives().uid);
        const document = { ...customerRewardPoint.toPrimitives() };

        await collection.set(document);
    }

    async search(uid: CustomerRewardPointUid) {
        const reference = await this.collection().doc(uid.value).get();
        const doc = reference.data() as { uid: string; amount: number };

        return doc ? CustomerRewardPoint.fromPrimitives(doc) : null;
    }

    protected collection() {
        return firestore.collection(this.moduleName());
    }

    moduleName() {
        return 'customer_reward'
    }
}