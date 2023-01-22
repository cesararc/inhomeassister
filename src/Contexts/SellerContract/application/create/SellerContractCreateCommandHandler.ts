import { Command } from '../../../Shared/domain/Command';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { SellerContractCreateCommand } from './SellerContractCreateCommand';
import { SellerContractCreate } from './SellerContractCreate';
import { CustomerUid } from '../../../Customer/Customer/domain/CustomerUid';
import { ServiceProviderUid } from '../../../ServiceProvider/domain/ServiceProviderUid';
import { SellerUid } from '../../../Seller/domain/SellerUid';
import { SellerContractUid } from '../../domain/SellerContractUid';
import { SellerContractCreatedAt } from '../../domain/SellerContractCreatedAt';
import { SellerContractVerified } from '../../domain/SellerContractVerified';
import { SellerContractOfficialDoc } from '../../domain/SellerContractOfficialDoc';
import { SellerContractFinancialDoc } from '../../domain/SellerContractFinancialDoc';
import { SellerContractUpdatedAt } from '../../domain/SellerContractUpdatedAt';

export class SellerContractCreateCommandHandler implements CommandHandler<SellerContractCreateCommand>{
    constructor(private sellerContract: SellerContractCreate) { }

    subscribedTo(): Command {
        return SellerContractCreateCommand;
    }

    async handle(command: SellerContractCreateCommand): Promise<void> {
        await this.sellerContract.run(
            new SellerContractUid(command.uid),
            new SellerUid(command.seller),
            new CustomerUid(command.customer),
            new ServiceProviderUid(command.serviceProvider),
            new SellerContractVerified(SellerContractVerified.initialize()),
            new SellerContractOfficialDoc(command.officialDoc),
            new SellerContractFinancialDoc(command.financialDoc),
            new SellerContractCreatedAt(SellerContractCreatedAt.initialize()),
            new SellerContractUpdatedAt(SellerContractUpdatedAt.initialize())
        )
    }
}