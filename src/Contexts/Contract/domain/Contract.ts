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
import { ContractProjectPrice } from './ContractProjectPrice';
import { ContractProjectBasePrice } from './ContractProjectBasePrice';
import { ContractProjectSellerRevenue } from './ContractProjectSellerRevenue';

export class Contract extends AggregateRoot {

    uid: ContractUid;
    seller: UserRecord;
    customer: UserRecord;
    serviceProvider: UserRecord;
    officialDoc: ContractOfficialDoc;
    financialDoc: ContractFinancialDoc;
    verified: ContractVerified;
    projectPrice: ContractProjectPrice;
    projectBasePrice: ContractProjectBasePrice;
    projectSellerRevenue: ContractProjectSellerRevenue;
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
        price: ContractProjectPrice,
        basePrice: ContractProjectBasePrice,
        sellerRevenue: ContractProjectSellerRevenue,
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
        this.projectPrice = price;
        this.projectBasePrice = basePrice;
        this.projectSellerRevenue = sellerRevenue;
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
        projectPrice: ContractProjectPrice,
        projectBasePrice: ContractProjectBasePrice,
        projectSellerRevenue: ContractProjectSellerRevenue,
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
            projectPrice,
            projectBasePrice,
            projectSellerRevenue,
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
        verified,
        projectPrice,
        projectBasePrice,
        projectSellerRevenue,
        verifiedAt,
        createdAt,
        updatedAt }:
        {
            uid: string,
            seller: any,
            customer: any,
            serviceProvider: any,
            officialDoc: string,
            financialDoc: string,
            verified: boolean,
            projectPrice: number;
            projectBasePrice: number;
            projectSellerRevenue: number;
            verifiedAt: string,
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
            new ContractProjectPrice(projectPrice),
            new ContractProjectBasePrice(projectBasePrice),
            new ContractProjectSellerRevenue(projectSellerRevenue),
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
            projectPrice: this.projectPrice.value,
            projectBasePrice: this.projectBasePrice.value,
            projectSellerRevenue: this.projectSellerRevenue.value,
            verifiedAt: this.verifiedAt.value,
            createdAt: this.createdAt.value,
            updateAt: this.updateAt.value,

        }
    }
}