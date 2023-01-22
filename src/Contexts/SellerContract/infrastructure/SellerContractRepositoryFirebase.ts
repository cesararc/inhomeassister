import { SellerContractRepository } from '../domain/SellerContractRepository';
import firestore from '../../../Apps/database';
import { SellerContract } from '../domain/SellerContract';


export class SellerContractRepositoryFirebase implements SellerContractRepository {

    protected collection() {
        return firestore.collection(this.moduleName());
    }

    async create(sellerContract: SellerContract): Promise<void> {
        const collection = this.collection().doc(sellerContract.uid.value);
        const document = { ...sellerContract.toPrimitives() };

        await collection.set(document);
    }

    moduleName(): string {
        return "seller_contract"
    }
}