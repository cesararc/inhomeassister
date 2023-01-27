import { ContractRepository } from '../../domain/ContractRepository';
import { ContractUid } from '../../domain/ContractUid';

export class ContractReject {
    constructor(private repository: ContractRepository) { }

    async run(uid: ContractUid): Promise<void> {
        return await this.repository.contractReject(uid);
    }
}