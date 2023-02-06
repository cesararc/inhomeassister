import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { UserRecord } from '../../UserRecord/domain/UserRecord';
import { ContractUid } from './ContractUid';
import { ContractOfficialDoc } from './ContractOfficialDoc';
import { ContractFinancialDoc } from './ContractFinancialDoc';
import { ContractCreatedAt } from './ContractCreatedAt';
import { ContractUpdatedAt } from './ContractUpdatedAt';
import { ContractCreatedDomainEvent } from './ContractCreatedDomainEvent';
import { ContractProjectPrice } from './ContractProjectPrice';
import { ContractProjectBasePrice } from './ContractProjectBasePrice';
import { ContractProjectSellerRevenue } from './ContractProjectSellerRevenue';
import { ContractStatus } from './ContractStatus';
import { ContractReviewedAt } from './ContractReviewedAt';

export class Contract extends AggregateRoot {

    uid: ContractUid;
    seller: UserRecord;
    customer: UserRecord;
    serviceProvider: UserRecord;
    officialDoc: ContractOfficialDoc;
    financialDoc: ContractFinancialDoc;
    status: ContractStatus;
    projectPrice: ContractProjectPrice;
    projectBasePrice: ContractProjectBasePrice;
    projectSellerRevenue: ContractProjectSellerRevenue;
    reviewedAt: ContractReviewedAt;
    createdAt: ContractCreatedAt;
    updateAt: ContractUpdatedAt;

    constructor(
        uid: ContractUid,
        seller: UserRecord,
        customer: UserRecord,
        serviceProvider: UserRecord,
        contractDoc: ContractOfficialDoc,
        financialDoc: ContractFinancialDoc,
        status: ContractStatus,
        price: ContractProjectPrice,
        basePrice: ContractProjectBasePrice,
        sellerRevenue: ContractProjectSellerRevenue,
        reviewedAt: ContractReviewedAt,
        createdAt: ContractCreatedAt,
        updatedAt: ContractUpdatedAt) {

        super();
        this.uid = uid;
        this.seller = seller;
        this.customer = customer;
        this.serviceProvider = serviceProvider;
        this.officialDoc = contractDoc;
        this.financialDoc = financialDoc;
        this.status = status;
        this.projectPrice = price;
        this.projectBasePrice = basePrice;
        this.projectSellerRevenue = sellerRevenue;
        this.reviewedAt = reviewedAt;
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
        status: ContractStatus,
        projectPrice: ContractProjectPrice,
        projectBasePrice: ContractProjectBasePrice,
        projectSellerRevenue: ContractProjectSellerRevenue,
        reviewedAt: ContractUpdatedAt,
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
            status,
            projectPrice,
            projectBasePrice,
            projectSellerRevenue,
            reviewedAt,
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
        status,
        projectPrice,
        projectBasePrice,
        projectSellerRevenue,
        reviewedAt,
        createdAt,
        updatedAt }:
        {
            uid: string,
            seller: any,
            customer: any,
            serviceProvider: any,
            officialDoc: string,
            financialDoc: string,
            status: any,
            projectPrice: number;
            projectBasePrice: number;
            projectSellerRevenue: number;
            reviewedAt: string,
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
            new ContractStatus(status),
            new ContractProjectPrice(projectPrice),
            new ContractProjectBasePrice(projectBasePrice),
            new ContractProjectSellerRevenue(projectSellerRevenue),
            new ContractReviewedAt(reviewedAt),
            new ContractCreatedAt(createdAt),
            new ContractUpdatedAt(updatedAt)
        );
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            seller: this.seller.toPrimitivesDocument(),
            customer: this.customer.toPrimitivesDocument(),
            serviceProvider: this.serviceProvider.toPrimitivesDocument(),
            officialDoc: this.officialDoc.value,
            financialDoc: this.financialDoc.value,
            status: this.status.value,
            projectPrice: this.projectPrice.value,
            projectBasePrice: this.projectBasePrice.value,
            projectSellerRevenue: this.projectSellerRevenue.value,
            reviewedAt: this.reviewedAt.value,
            createdAt: this.createdAt.value,
            updateAt: this.updateAt.value,

        }
    }
}