import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { Command } from '../../../Shared/domain/Command';
import { ContractUid } from '../../domain/ContractUid';
import { ContractReviewedAt } from '../../domain/ContractReviewedAt';
import { ContractStatus } from '../../domain/ContractStatus';
import { ContractApprove } from './ContractApprove';
import { ContractApproveCommand } from './ContractApproveCommand';

export class ContractApproveCommandHandler implements CommandHandler<ContractApproveCommand>{
    constructor(private contract: ContractApprove) { }

    subscribedTo(): Command {
        return ContractApproveCommand;
    }

    async handle(command: ContractApproveCommand): Promise<void> {

        await this.contract.run(
            new ContractUid(command.uid),
            new ContractReviewedAt(ContractReviewedAt.initialize()),
            new ContractStatus(ContractStatus.approve()));
    }
}