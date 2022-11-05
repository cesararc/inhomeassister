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
}