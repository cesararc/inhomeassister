import { ContractRepository } from '../../domain/ContractRepository';
import { Contract } from '../../domain/Contract';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';
import { ContractUid } from '../../domain/ContractUid';
import { ContractCreatedAt } from '../../domain/ContractCreatedAt';
import { ContractVerified } from '../../domain/ContractVerified';
import { ContractOfficialDoc } from '../../domain/ContractOfficialDoc';
import { ContractFinancialDoc } from '../../domain/ContractFinancialDoc';
import { ContractUpdatedAt } from '../../domain/ContractUpdatedAt';
import { UserRecordUid } from '../../../UserRecord/domain/UserRecordUid';
import { ContractUserRecordNotFound } from '../../domain/ContractUserRecordNotFound';
import { ContractVerifiedAt } from '../../domain/ContractVerifiedAt';

type Params = {
    uid: ContractUid,
    sellerUid: UserRecordUid;
    customerUid: UserRecordUid;
    serviceProviderUid: UserRecordUid;
    verified: ContractVerified;
    officialDoc: ContractOfficialDoc;
    financialDoc: ContractFinancialDoc;
    verifiedAt: ContractVerifiedAt;
    createdAt: ContractCreatedAt;
    updatedAt: ContractUpdatedAt;
}

export class ContractCreate {
    constructor(private userRecord: UserRecordRepository, private repository: ContractRepository) { }

    async run({ uid, sellerUid, customerUid, serviceProviderUid, financialDoc, officialDoc, verified, verifiedAt, createdAt, updatedAt }: Params): Promise<void> {

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
            verified,
            verifiedAt,
            updatedAt,
            createdAt);

        return await this.repository.create(contract);
    }
}