import { ContractRepository } from '../../domain/ContractRepository';
import { ContractUid } from '../../domain/ContractUid';
import { ContractReviewedAt } from '../../domain/ContractReviewedAt';
import { ContractStatus } from '../../domain/ContractStatus';

export class ContractApprove {
    constructor(private repository: ContractRepository) { }

    async run(uid: ContractUid, reviewedAt: ContractReviewedAt, status: ContractStatus): Promise<void> {
        return await this.repository.contractReview(uid, reviewedAt, status);
    }
}