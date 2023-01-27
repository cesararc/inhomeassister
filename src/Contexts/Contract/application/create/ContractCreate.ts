import { ContractRepository } from '../../domain/ContractRepository';
import { Contract } from '../../domain/Contract';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';
import { ContractUid } from '../../domain/ContractUid';
import { ContractCreatedAt } from '../../domain/ContractCreatedAt';
import { ContractStatus } from '../../domain/ContractStatus';
import { ContractOfficialDoc } from '../../domain/ContractOfficialDoc';
import { ContractFinancialDoc } from '../../domain/ContractFinancialDoc';
import { ContractUpdatedAt } from '../../domain/ContractUpdatedAt';
import { UserRecordUid } from '../../../UserRecord/domain/UserRecordUid';
import { ContractUserRecordNotFound } from '../../domain/ContractUserRecordNotFound';
import { ContractVerifiedAt } from '../../domain/ContractVerifiedAt';
import { ContractProjectPrice } from '../../domain/ContractProjectPrice';
import { ContractProjectBasePrice } from '../../domain/ContractProjectBasePrice';
import { ContractProjectSellerRevenue } from '../../domain/ContractProjectSellerRevenue';

type Params = {
    uid: ContractUid,
    sellerUid: UserRecordUid;
    customerUid: UserRecordUid;
    serviceProviderUid: UserRecordUid;
    officialDoc: ContractOfficialDoc;
    financialDoc: ContractFinancialDoc;
    status: ContractStatus;
    projectPrice: ContractProjectPrice,
    projectBasePrice: ContractProjectBasePrice;
    projectSellerRevenue: ContractProjectSellerRevenue;
    verifiedAt: ContractVerifiedAt;
    createdAt: ContractCreatedAt;
    updatedAt: ContractUpdatedAt;
}

export class ContractCreate {
    constructor(private userRecord: UserRecordRepository, private repository: ContractRepository) { }

    async run({ uid, sellerUid, customerUid, serviceProviderUid, financialDoc, officialDoc, status, projectPrice, projectBasePrice, projectSellerRevenue, verifiedAt, createdAt, updatedAt }: Params): Promise<void> {

        const seller = await this.userRecord.profile(sellerUid);
        const customer = await this.userRecord.profile(customerUid);
        const serviceProvider = await this.userRecord.profile(serviceProviderUid);

        if (!seller || !customer || !serviceProvider) throw new ContractUserRecordNotFound();

        const contract = Contract.create(
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
            verifiedAt,
            updatedAt,
            createdAt);

        return await this.repository.create(contract);
    }
}