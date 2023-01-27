import { ContractRepository } from '../../domain/ContractRepository';
import { ContractUid } from '../../domain/ContractUid';
import { ContractReviewedAt } from '../../domain/ContractReviewedAt';
import { ContractStatus } from '../../domain/ContractStatus';

export class ContractReject {
    constructor(private repository: ContractRepository) { }

    async run(uid: ContractUid, reviewedAt: ContractReviewedAt, status: ContractStatus): Promise<void> {
        return await this.repository.contractReject(uid, reviewedAt, status);
    }
}