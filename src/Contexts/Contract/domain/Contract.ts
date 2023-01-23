import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { UserRecord } from '../../UserRecord/domain/UserRecord';
import { ContractUid } from './ContractUid';
import { ContractOfficialDoc } from './ContractOfficialDoc';
import { ContractFinancialDoc } from './ContractFinancialDoc';
import { ContractCreatedAt } from './ContractCreatedAt';
import { ContractVerified } from './ContractVerified';
import { ContractUpdatedAt } from './ContractUpdatedAt';
import { ContractCreatedDomainEvent } from './ContractCreatedDomainEvent';
import { ContractVerifiedAt } from './ContractVerifiedAt';

export class Contract extends AggregateRoot {

    uid: ContractUid;
    seller: UserRecord;
    customer: UserRecord;
    serviceProvider: UserRecord;
    officialDoc: ContractOfficialDoc;
    financialDoc: ContractFinancialDoc;
    verified: ContractVerified;
    verifiedAt: ContractVerifiedAt;
    createdAt: ContractCreatedAt;
    updateAt: ContractUpdatedAt;

    constructor(
        uid: ContractUid,
        seller: UserRecord,
        customer: UserRecord,
        serviceProvider: UserRecord,
        contractDoc: ContractOfficialDoc,
        financialDoc: ContractFinancialDoc,
        verified: ContractVerified,
        verifiedAt: ContractVerifiedAt,
        createdAt: ContractCreatedAt,
        updatedAt: ContractUpdatedAt) {

        super();
        this.uid = uid;
        this.seller = seller;
        this.customer = customer;
        this.serviceProvider = serviceProvider;
        this.officialDoc = contractDoc;
        this.financialDoc = financialDoc;
        this.verified = verified;
        this.verifiedAt = verifiedAt;
        this.createdAt = createdAt;
        this.updateAt = updatedAt;
    }

    static create(
        uid: ContractUid,
        seller: UserRecord,
        customer: UserRecord,
        serviceProvider: UserRecord,
        officialDoc: ContractOfficialDoc,
        financialDoc: ContractFinancialDoc,
        verified: ContractVerified,
        verifiedAt: ContractUpdatedAt,
        createdAt: ContractCreatedAt,
        updatedAt: ContractUpdatedAt
    ) {
        const contract = new Contract(
            uid,
            seller,
            customer,
            serviceProvider,
            officialDoc,
            financialDoc,
            verified,
            verifiedAt,
            createdAt,
            updatedAt);

        contract.record(new ContractCreatedDomainEvent({ uid: seller.uid.value }));

        return contract;
    }


    static fromPrimitives({
        uid,
        seller,
        customer,
        serviceProvider,
        officialDoc,
        financialDoc,
        verifiedAt,
        verified,
        createdAt,
        updatedAt }:
        {
            uid: string,
            seller: any,
            customer: any,
            serviceProvider: any,
            officialDoc: string,
            financialDoc: string,
            verifiedAt: string,
            verified: boolean,
            createdAt: string,
            updatedAt: string
        }) {

        return new Contract(
            new ContractUid(uid),
            UserRecord.fromPrimitives(seller),
            UserRecord.fromPrimitives(customer),
            UserRecord.fromPrimitives(serviceProvider),
            new ContractOfficialDoc(officialDoc),
            new ContractFinancialDoc(financialDoc),
            new ContractVerified(verified),
            new ContractVerifiedAt(verifiedAt),
            new ContractCreatedAt(createdAt),
            new ContractUpdatedAt(updatedAt)
        );
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
            verifiedAt: this.verifiedAt.value,
            createdAt: this.createdAt.value,
            updateAt: this.updateAt.value,

        }
    }
}