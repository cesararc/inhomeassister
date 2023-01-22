import firestore from '../../../Apps/database';
import { ContractRepository } from '../domain/ContractRepository';
import { Contract } from '../domain/Contract';


export class ContractRepositoryFirebase implements ContractRepository {

    protected collection() {
        return firestore.collection(this.moduleName());
    }

    async create(contract: Contract): Promise<void> {
        const collection = this.collection().doc(contract.uid.value);
        const document = { ...contract.toPrimitives() };

        await collection.set(document);
    }

    async unverified(): Promise<Array<Contract>> {
        return [];
    }

    moduleName(): string {
        return "contract"
    }
}