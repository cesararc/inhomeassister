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
import { ContractVerifiedAt } from '../../domain/ContractVerifiedAt';

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
            verified: new ContractVerified(ContractVerified.initialize()),
            verifiedAt: new ContractVerifiedAt(ContractVerifiedAt.initialize()),
            createdAt: new ContractCreatedAt(ContractCreatedAt.initialize()),
            updatedAt: new ContractUpdatedAt(ContractUpdatedAt.initialize())
        }

        await this.contract.run(contract)
    }
}