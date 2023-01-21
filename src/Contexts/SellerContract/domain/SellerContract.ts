import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { ContractDoc } from './ContractDoc';
import { FinancialDoc } from './FinancialDoc';
import { ServiceProviderUid } from '../../ServiceProvider/domain/ServiceProviderUid';
import { CustomerUid } from '../../Customer/Customer/domain/CustomerUid';
import { SellerContractCreatedDomainEvent } from './SellerContractCreatedDomainEvent';
import { SellerUid } from '../../Seller/domain/SellerUid';
import { SellerContractUid } from './SellerContractUid';
import { SellerContractCreatedAt } from './SellerContractCreatedAt';
import { SellerContractUpdatedAt } from './SellerContractUpdatedAt';

export class SellerContract extends AggregateRoot {

    uid: SellerContractUid;
    seller: SellerUid;
    customer: CustomerUid;
    serviceProvider: ServiceProviderUid;
    contractDoc: ContractDoc;
    financialDoc: FinancialDoc;
    createdAt: SellerContractCreatedAt;
    updateAt: SellerContractUpdatedAt;

    constructor(
        uid: SellerContractUid,
        seller: SellerUid,
        customer: CustomerUid,
        serviceProvider: ServiceProviderUid,
        contractDoc: ContractDoc,
        financialDoc: FinancialDoc,
        createdAt: SellerContractCreatedAt,
        updatedAt: SellerContractUpdatedAt) {

        super();
        this.uid = uid;
        this.seller = seller;
        this.customer = customer;
        this.serviceProvider = serviceProvider;
        this.contractDoc = contractDoc;
        this.financialDoc = financialDoc;
        this.createdAt = createdAt;
        this.updateAt = updatedAt;
    }

    static create(
        uid: SellerContractUid,
        seller: SellerUid,
        customer: CustomerUid,
        serviceProvider: ServiceProviderUid,
        contractDoc: ContractDoc,
        financialDoc: FinancialDoc,
        createdAt: SellerContractCreatedAt
    ) {
        const contract = new SellerContract(uid, seller, customer, serviceProvider, contractDoc, financialDoc, createdAt, createdAt);

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