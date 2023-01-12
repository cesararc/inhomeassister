import { FirebaseRepository } from '../../Shared/infrastructure/persistence/FirebaseRepository';
import { Seller } from '../domain/Seller';
import { SellerUid } from '../domain/SellerUid';

type SellerPlainData = {
    uid: string;
    address: string;
    dni: string;
    description: string;
}

export class SellerRepositoryFirebase extends FirebaseRepository<Seller> implements SellerRepositoryFirebase {

    async create(seller: Seller): Promise<void> {
        await this.persist(seller);
    }

    async profile(uid: SellerUid): Promise<Seller> {
        const reference = await this.collection().doc(uid.value).get();
        const doc = reference.data() as SellerPlainData;

        const data = { uid: doc.uid, address: doc.address, dni: doc.dni };

        return Seller.fromPrimitives(data);
    }


    async update(serviceProvider: Seller): Promise<void> {
        try {
            const collection = this.collection().doc(serviceProvider.toPrimitives().uid);

            await collection.update(serviceProvider.toPrimitives());

        } catch (error) {
            return null;
        }
    }


    moduleName(): string {
        return "seller"
    }
}