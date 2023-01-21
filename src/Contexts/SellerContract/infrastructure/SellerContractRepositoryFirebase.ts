import { SellerContractRepository } from '../domain/SellerContractRepository';
import firestore from '../../../Apps/database';


export class SellerContractRepositoryFirebase implements SellerContractRepository {

    protected collection() {
        return firestore.collection(this.moduleName());
    }

    async create(sellerContract: any): Promise<void> {
        //firestore.getAll([])
        const collection = this.collection().doc();
        // const document = { ...aggregateRoot.toPrimitives() };

        await collection.set(sellerContract);
    }

    moduleName(): string {
        return "seller_contract"
    }
}