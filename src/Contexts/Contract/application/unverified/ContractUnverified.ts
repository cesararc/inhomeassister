import { ContractRepository } from '../../domain/ContractRepository';
import { Contract } from '../../domain/Contract';
import { UserRecordUid } from '../../../UserRecord/domain/UserRecordUid';

export class ContractUnverified {
    constructor(private repository: ContractRepository) { }

    async run(uid: UserRecordUid): Promise<Contract[]> {
        return await this.repository.unverified(uid);
    }
}
