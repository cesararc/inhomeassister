import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { UserRecord } from '../../UserRecord/domain/UserRecord';
import { ContractUid } from './ContractUid';
import { ContractOfficialDoc } from './ContractOfficialDoc';
import { ContractFinancialDoc } from './ContractFinancialDoc';
import { ContractCreatedAt } from './ContractCreatedAt';
import { ContractVerified } from './ContractVerified';
import { ContractUpdatedAt } from './ContractUpdatedAt';
import { ContractCreatedDomainEvent } from './ContractCreatedDomainEvent';

export class Contract extends AggregateRoot {

    uid: ContractUid;
    seller: UserRecord;
    customer: UserRecord;
    serviceProvider: UserRecord;
    officialDoc: ContractOfficialDoc;
    financialDoc: ContractFinancialDoc;
    verified: ContractVerified;
    createdAt: ContractCreatedAt;
    updateAt: ContractUpdatedAt;

    constructor(
        uid: ContractUid,
        seller: UserRecord,
        customer: UserRecord,
        serviceProvider: UserRecord,
        verified: ContractVerified,
        contractDoc: ContractOfficialDoc,
        financialDoc: ContractFinancialDoc,
        createdAt: ContractCreatedAt,
        updatedAt: ContractUpdatedAt) {

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
        uid: ContractUid,
        seller: UserRecord,
        customer: UserRecord,
        serviceProvider: UserRecord,
        verified: ContractVerified,
        officialDoc: ContractOfficialDoc,
        financialDoc: ContractFinancialDoc,
        createdAt: ContractCreatedAt,
        updatedAt: ContractUpdatedAt
    ) {
        const contract = new Contract(uid, seller, customer, serviceProvider, verified, officialDoc, financialDoc, createdAt, updatedAt);

        contract.record(new ContractCreatedDomainEvent({ uid: seller.uid.value }));

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