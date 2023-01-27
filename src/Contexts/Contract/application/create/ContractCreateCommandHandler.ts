import { Command } from '../../../Shared/domain/Command';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CustomerUid } from '../../../Customer/Customer/domain/CustomerUid';
import { ServiceProviderUid } from '../../../ServiceProvider/domain/ServiceProviderUid';
import { ContractUid } from '../../domain/ContractUid';
import { ContractCreatedAt } from '../../domain/ContractCreatedAt';
import { ContractStatus } from '../../domain/ContractStatus';
import { ContractOfficialDoc } from '../../domain/ContractOfficialDoc';
import { ContractFinancialDoc } from '../../domain/ContractFinancialDoc';
import { ContractUpdatedAt } from '../../domain/ContractUpdatedAt';
import { ContractCreate } from './ContractCreate';
import { ContractCreateCommand } from './ContractCreateCommand';
import { SellerUid } from '../../../Seller/domain/SellerUid';
import { ContractVerifiedAt } from '../../domain/ContractVerifiedAt';
import { ContractProjectPrice } from '../../domain/ContractProjectPrice';
import { ContractProjectBasePrice } from '../../domain/ContractProjectBasePrice';
import { ContractProjectSellerRevenue } from '../../domain/ContractProjectSellerRevenue';

export class ContractCreateCommandHandler implements CommandHandler<ContractCreateCommand>{
    constructor(private contract: ContractCreate) { }

    subscribedTo(): Command {
        return ContractCreateCommand;
    }

    async handle(command: ContractCreateCommand): Promise<void> {

        const contract = {
            uid: new ContractUid(command.uid),
            sellerUid: new SellerUid(command.seller),
            customerUid: new CustomerUid(command.customer),
            serviceProviderUid: new ServiceProviderUid(command.serviceProvider),
            officialDoc: new ContractOfficialDoc(command.officialDoc),
            financialDoc: new ContractFinancialDoc(command.financialDoc),
            status: new ContractStatus(ContractStatus.initialize()),
            projectPrice: new ContractProjectPrice(ContractProjectPrice.initialize()),
            projectBasePrice: new ContractProjectBasePrice(ContractProjectBasePrice.initialize()),
            projectSellerRevenue: new ContractProjectSellerRevenue(ContractProjectSellerRevenue.initialize()),
            verifiedAt: new ContractVerifiedAt(ContractVerifiedAt.initialize()),
            createdAt: new ContractCreatedAt(ContractCreatedAt.initialize()),
            updatedAt: new ContractUpdatedAt(ContractUpdatedAt.initialize())
        }

        await this.contract.run(contract)
    }
}