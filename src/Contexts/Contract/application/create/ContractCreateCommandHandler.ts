import { Command } from '../../../Shared/domain/Command';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CustomerUid } from '../../../Customer/Customer/domain/CustomerUid';
import { ServiceProviderUid } from '../../../ServiceProvider/domain/ServiceProviderUid';
import { ContractUid } from '../../domain/ContractUid';
import { ContractCreatedAt } from '../../domain/ContractCreatedAt';
import { ContractVerified } from '../../domain/ContractVerified';
import { ContractOfficialDoc } from '../../domain/ContractOfficialDoc';
import { ContractFinancialDoc } from '../../domain/ContractFinancialDoc';
import { ContractUpdatedAt } from '../../domain/ContractUpdatedAt';
import { ContractCreate } from './ContractCreate';
import { ContractCreateCommand } from './ContractCreateCommand';
import { SellerUid } from '../../../Seller/domain/SellerUid';

export class ContractCreateCommandHandler implements CommandHandler<ContractCreateCommand>{
    constructor(private contract: ContractCreate) { }

    subscribedTo(): Command {
        return ContractCreateCommand;
    }

    async handle(command: ContractCreateCommand): Promise<void> {
        await this.contract.run(
            new ContractUid(command.uid),
            new SellerUid(command.seller),
            new CustomerUid(command.customer),
            new ServiceProviderUid(command.serviceProvider),
            new ContractVerified(ContractVerified.initialize()),
            new ContractOfficialDoc(command.officialDoc),
            new ContractFinancialDoc(command.financialDoc),
            new ContractCreatedAt(ContractCreatedAt.initialize()),
            new ContractUpdatedAt(ContractUpdatedAt.initialize())
        )
    }
}