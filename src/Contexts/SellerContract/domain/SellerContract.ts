import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { SellerContractOfficialDoc } from './SellerContractOfficialDoc';
import { SellerContractFinancialDoc } from './SellerContractFinancialDoc';
import { ServiceProviderUid } from '../../ServiceProvider/domain/ServiceProviderUid';
import { CustomerUid } from '../../Customer/Customer/domain/CustomerUid';
import { SellerContractCreatedDomainEvent } from './SellerContractCreatedDomainEvent';
import { SellerUid } from '../../Seller/domain/SellerUid';
import { SellerContractUid } from './SellerContractUid';
import { SellerContractCreatedAt } from './SellerContractCreatedAt';
import { SellerContractUpdatedAt } from './SellerContractUpdatedAt';
import { SellerContractVerified } from './SellerContractVerified';

export class SellerContract extends AggregateRoot {

    uid: SellerContractUid;
    seller: SellerUid;
    customer: CustomerUid;
    serviceProvider: ServiceProviderUid;
    officialDoc: SellerContractOfficialDoc;
    financialDoc: SellerContractFinancialDoc;
    verified: SellerContractVerified;
    createdAt: SellerContractCreatedAt;
    updateAt: SellerContractUpdatedAt;

    constructor(
        uid: SellerContractUid,
        seller: SellerUid,
        customer: CustomerUid,
        serviceProvider: ServiceProviderUid,
        verified: SellerContractVerified,
        contractDoc: SellerContractOfficialDoc,
        financialDoc: SellerContractFinancialDoc,
        createdAt: SellerContractCreatedAt,
        updatedAt: SellerContractUpdatedAt) {

        super();
        this.uid = uid;
        this.seller = seller;
        this.customer = customer;
        this.serviceProvider = serviceProvider;
        this.verified = verified;
        this.officialDoc = contractDoc;
        this.financialDoc = financialDoc;
        this.createdAt = createdAt;
        this.updateAt = updatedAt;
    }

    static create(
        uid: SellerContractUid,
        seller: SellerUid,
        customer: CustomerUid,
        serviceProvider: ServiceProviderUid,
        verified: SellerContractVerified,
        officialDoc: SellerContractOfficialDoc,
        financialDoc: SellerContractFinancialDoc,
        createdAt: SellerContractCreatedAt,
        updatedAt: SellerContractUpdatedAt
    ) {
        const contract = new SellerContract(uid, seller, customer, serviceProvider, verified, officialDoc, financialDoc, createdAt, updatedAt);

        contract.record(new SellerContractCreatedDomainEvent({ uid: seller.value }));

        return contract;
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            seller: this.seller.value,
            customer: this.customer.value,
            serviceProvider: this.serviceProvider.value,
            officialDoc: this.officialDoc.value,
            financialDoc: this.financialDoc.value,
            verified: this.verified.value,
            createdAt: this.createdAt.value,
            updateAt: this.updateAt.value
        }
    }
}