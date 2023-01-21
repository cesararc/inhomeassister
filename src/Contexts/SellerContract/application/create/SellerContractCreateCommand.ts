import { Command } from '../../../Shared/domain/Command';

export class SellerContractCreateCommand extends Command {
    uid: string;
    seller: string;
    customer: string;
    serviceProvider: string;
    contractDoc: string;
    financialDoc: string;

    constructor(uid: string, seller: string, customer: string, serviceProvider: string, contractDoc: string, financialDoc: string) {
        super();
        this.uid = uid;
        this.seller = seller;
        this.customer = customer;
        this.serviceProvider = serviceProvider;
        this.contractDoc = contractDoc;
        this.financialDoc = financialDoc;
    }
}
