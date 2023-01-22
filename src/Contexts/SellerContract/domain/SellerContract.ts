import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { SellerContractOfficialDoc } from './SellerContractOfficialDoc';
import { SellerContractFinancialDoc } from './SellerContractFinancialDoc';
import { SellerContractCreatedDomainEvent } from './SellerContractCreatedDomainEvent';
import { SellerContractCreatedAt } from './SellerContractCreatedAt';
import { SellerContractUpdatedAt } from './SellerContractUpdatedAt';
import { SellerContractVerified } from './SellerContractVerified';
import { SellerContractUid } from './SellerContractUid';
import { UserRecord } from '../../UserRecord/domain/UserRecord';

export class SellerContract extends AggregateRoot {

    uid: SellerContractUid;
    seller: UserRecord;
    customer: UserRecord;
    serviceProvider: UserRecord;
    officialDoc: SellerContractOfficialDoc;
    financialDoc: SellerContractFinancialDoc;
    verified: SellerContractVerified;
    createdAt: SellerContractCreatedAt;
    updateAt: SellerContractUpdatedAt;

    constructor(
        uid: SellerContractUid,
        seller: UserRecord,
        customer: UserRecord,
        serviceProvider: UserRecord,
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
        seller: UserRecord,
        customer: UserRecord,
        serviceProvider: UserRecord,
        verified: SellerContractVerified,
        officialDoc: SellerContractOfficialDoc,
        financialDoc: SellerContractFinancialDoc,
        createdAt: SellerContractCreatedAt,
        updatedAt: SellerContractUpdatedAt
    ) {
        const contract = new SellerContract(uid, seller, customer, serviceProvider, verified, officialDoc, financialDoc, createdAt, updatedAt);

        contract.record(new SellerContractCreatedDomainEvent({ uid: seller.uid.value }));

        return contract;
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            seller: this.seller.toPrimitives(),
            customer: this.customer.toPrimitives(),
            serviceProvider: this.serviceProvider.toPrimitives(),
            officialDoc: this.officialDoc.value,
            financialDoc: this.financialDoc.value,
            verified: this.verified.value,
            createdAt: this.createdAt.value,
            updateAt: this.updateAt.value
        }
    }
}