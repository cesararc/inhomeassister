import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { ContractRejectCommand } from './ContractRejectCommand';
import { ContractReject } from './ContractReject';
import { Command } from '../../../Shared/domain/Command';
import { ContractUid } from '../../domain/ContractUid';
import { ContractReviewedAt } from '../../domain/ContractReviewedAt';
import { ContractStatus } from '../../domain/ContractStatus';

export class ContractRejectCommandHandler implements CommandHandler<ContractRejectCommand>{
    constructor(private contract: ContractReject) { }

    subscribedTo(): Command {
        return ContractRejectCommand;
    }

    async handle(command: ContractRejectCommand): Promise<void> {

        await this.contract.run(
            new ContractUid(command.uid),
            new ContractReviewedAt(ContractReviewedAt.initialize()),
            new ContractStatus(ContractStatus.reject()));
    }
}