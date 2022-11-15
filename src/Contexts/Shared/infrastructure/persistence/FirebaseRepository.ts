import firestore from '../../../../Apps/database';
import { AggregateRoot } from "../../domain/AggregateRoot";

export abstract class FirebaseRepository<T extends AggregateRoot>{
    protected abstract moduleName(): string;

    protected collection() {
        return firestore.collection(this.moduleName());
    }

    protected async persist(aggregateRoot: T) {
        const collection = this.collection().doc(aggregateRoot.toPrimitives().uid);
        const document = { ...aggregateRoot.toPrimitives() };

        return await collection.set(document);
    }

    protected async profileRetrieve<R>(uid: string): Promise<R> {
        const reference = await this.collection().doc(uid).get();

        return reference.data() as R;
    }

    protected async profileUpdate(aggregateRoot: T): Promise<void> {
        const collection = this.collection().doc(aggregateRoot.toPrimitives().uid);

        await collection.update(aggregateRoot.toPrimitives());
    }
}