import { Seller } from '../domain/Seller';
import { SellerUid } from '../domain/SellerUid';
import firestore from '../../../Apps/database';

type SellerPlainData = {
    uid: string;
    address: string;
    dni: string;
    description: string;
}

export class SellerRepositoryFirebase implements SellerRepositoryFirebase {

    async create(seller: Seller): Promise<void> {
        const collection = this.collection().doc(seller.toPrimitives().uid);
        const document = { ...seller.toPrimitives() };

        await collection.set(document);
    }

    async profile(uid: SellerUid): Promise<Seller> {
        const reference = await this.collection().doc(uid.value).get();
        const doc = reference.data() as SellerPlainData;

        const data = { uid: doc.uid, address: doc.address, dni: doc.dni };

        return Seller.fromPrimitives(data);
    }

    async update(serviceProvider: Seller): Promise<void> {
        const collection = this.collection().doc(serviceProvider.toPrimitives().uid);

        await collection.update(serviceProvider.toPrimitives());
    }

    protected collection() {
        return firestore.collection(this.moduleName());
    }

    moduleName(): string {
        return "seller"
    }
}