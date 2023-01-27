import firestore from '../../../Apps/database';
import { ContractRepository } from '../domain/ContractRepository';
import { Contract } from '../domain/Contract';
import { UserRecordUid } from '../../UserRecord/domain/UserRecordUid';
import { ContractUid } from '../domain/ContractUid';
import { ContractReviewedAt } from '../domain/ContractReviewedAt';
import { ContractStatus } from '../domain/ContractStatus';


export class ContractRepositoryFirebase implements ContractRepository {

    protected collection() {
        return firestore.collection(this.moduleName());
    }

    async create(contract: Contract): Promise<void> {
        const collection = this.collection().doc(contract.uid.value);
        const document = { ...contract.toPrimitives() };

        await collection.set(document);
    }

    async contractReject(uid: ContractUid, reviewedAt: ContractReviewedAt, status: ContractStatus): Promise<void> {
        const collection = this.collection().doc(uid.value);

        await collection.update({ reviewedAt: reviewedAt.value, status: status.value });
    }

    async contractApprove(uid: ContractUid, reviewedAt: ContractReviewedAt, status: ContractStatus): Promise<void> {
        const collection = this.collection().doc(uid.value);

        await collection.update({ reviewedAt: reviewedAt.value, status: status.value });
    }

    async unverified(uid: UserRecordUid): Promise<Array<Contract>> {
        const reference = this.collection().where("seller.uid", "==", uid.value);
        const collection = await reference.get();

        if (collection.empty) return [];

        collection.docs.map(e => console.log(e.data()))
        return collection.docs.map(e => Contract.fromPrimitives({ ...e.data() } as any));
    }

    moduleName(): string {
        return "contract"
    }
}