import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { Command } from '../../../Shared/domain/Command';
import { ContractUid } from '../../domain/ContractUid';
import { ContractReviewedAt } from '../../domain/ContractReviewedAt';
import { ContractStatus } from '../../domain/ContractStatus';
import { ContractProduction } from './ContractProduction';
import { ContractProductionCommand } from './ContractProductionCommand';

export class ContractProductionCommandHandler implements CommandHandler<ContractProductionCommand>{
    constructor(private contract: ContractProduction) { }

    subscribedTo(): Command {
        return ContractProductionCommand;
    }

    async handle(command: ContractProductionCommand): Promise<void> {

        await this.contract.run(
            new ContractUid(command.uid),
            new ContractReviewedAt(ContractReviewedAt.initialize()),
            new ContractStatus(ContractStatus.production()));
    }
}