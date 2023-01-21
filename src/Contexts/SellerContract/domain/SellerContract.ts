import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { ContractDoc } from './ContractDoc';
import { FinancialDoc } from './FinancialDoc';
import { ServiceProviderUid } from '../../ServiceProvider/domain/ServiceProviderUid';
import { CustomerUid } from '../../Customer/Customer/domain/CustomerUid';
import { SellerContractCreatedDomainEvent } from './SellerContractCreatedDomainEvent';
import { SellerUid } from '../../Seller/domain/SellerUid';
import { SellerContractUid } from './SellerContractUid';

export class SellerContract extends AggregateRoot {

    uid: SellerContractUid;
    seller: SellerUid;
    customer: CustomerUid;
    serviceProvider: ServiceProviderUid;
    contractDoc: ContractDoc;
    financialDoc: FinancialDoc;

    constructor(uid: SellerContractUid, seller: SellerUid, customer: CustomerUid, serviceProvider: ServiceProviderUid, contractDoc: ContractDoc, financialDoc: FinancialDoc) {
        super();
        this.uid = uid;
        this.seller = seller;
        this.customer = customer;
        this.serviceProvider = serviceProvider;
        this.contractDoc = contractDoc;
        this.financialDoc = financialDoc;
    }

    static create(uid: SellerContractUid, seller: SellerUid, customer: CustomerUid, serviceProvider: ServiceProviderUid, contractDoc: ContractDoc, financialDoc: FinancialDoc): SellerContract {
        const contract = new SellerContract(uid, seller, customer, serviceProvider, contractDoc, financialDoc);

        contract.record(new SellerContractCreatedDomainEvent({ uid: seller.value }));

        return contract;
    }

    // static fromPrimitives(plainData: { uid: string; address: string; dni: string; }) {
    //     return new SellerContract(
    //         new SellerUid(plainData.uid),
    //         new SellerAddress(plainData.address),
    //         new SellerDni(plainData.dni),
    //     );
    // }

    toPrimitives() {
        return {

        }
    }


}