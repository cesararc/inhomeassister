import firestore from '../../../../Apps/database';
import { AggregateRoot } from "../../domain/AggregateRoot";

export abstract class FirebaseRepository<T extends AggregateRoot>{
    protected abstract moduleName(): string;

    protected abstract orderBy(): string;

    protected collection() {
        return firestore.collection(this.moduleName());
    }

    protected async persist(aggregateRoot: T) {
        const collection = this.collection().doc(aggregateRoot.toPrimitives().id);
        const document = { ...aggregateRoot.toPrimitives() };

        return await collection.set(document);
    }

    protected async paginatePaginateQuery<T>(limit: number, startAfter: number): Promise<Array<T>> {
        const ref = firestore.collection(this.moduleName()).orderBy(this.orderBy());

        const snapshot = await ref.startAfter(startAfter).limit(limit).get();

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<T>

        return result;
    }

    protected async paginateSimpleQuery<T>(limit: number): Promise<Array<T>> {
        const ref = firestore.collection(this.moduleName()).orderBy(this.orderBy());

        const snapshot = await ref.limit(limit).get();

        const result = snapshot.docs.map((data: any) => ({
            id: data.id,
            ...data.data(),
        })) as Array<T>;

        return result;
    }

    // protected async paginated<T>(limitOfDocuments: number, page: number): Promise<Paginate<T>> {

    //     const limit = page > 1 ? ((limitOfDocuments * page) - limitOfDocuments) : 0;

    //     const documents = await firestore.collection(this.moduleName())
    //         .select(this.orderBy())
    //         .orderBy(this.orderBy())
    //         .get();

    //     const documentRef: number = page > 1 ? documents.docs[limit - 1].data()[this.orderBy()] : 0;

    //     const snapshot = page > 1
    //         ? await this.paginatePaginateQuery<T>(limitOfDocuments, documentRef)
    //         : await this.paginateSimpleQuery<T>(limitOfDocuments);

    //     return {
    //         count: documents.size,
    //         results: snapshot
    //     }
    // }
}