import { Command } from '../../../Shared/domain/Command';

export class ContractCreateCommand extends Command {
    uid: string;
    seller: string;
    customer: string;
    serviceProvider: string;
    officialDoc: string;
    financialDoc: string;

    constructor(
        uid: string,
        seller: string,
        customer: string,
        serviceProvider: string,
        officialDoc: string,
        financialDoc: string,
    ) {
        super();
        this.uid = uid;
        this.seller = seller;
        this.customer = customer;
        this.serviceProvider = serviceProvider;
        this.officialDoc = officialDoc;
        this.financialDoc = financialDoc;
    }
}
