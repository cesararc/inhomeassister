import { Command } from '../../../Shared/domain/Command';

export class SellerContractCreateCommand extends Command {
    uid: string;
    seller: string;
    customer: string;
    serviceProvider: string;
    contractDoc: string;
    financialDoc: string;
    createdAt: string;

    constructor(uid: string,
        seller: string,
        customer: string,
        serviceProvider: string,
        contractDoc: string,
        financialDoc: string,
        createdAt: string) {
        super();
        this.uid = uid;
        this.seller = seller;
        this.customer = customer;
        this.serviceProvider = serviceProvider;
        this.contractDoc = contractDoc;
        this.financialDoc = financialDoc;
        this.createdAt = createdAt;
    }
}
