import { SellerContractRepository } from '../../domain/SellerContractRepository';
import { SellerContract } from '../../domain/SellerContract';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';
import { SellerContractUid } from '../../domain/SellerContractUid';
import { SellerContractCreatedAt } from '../../domain/SellerContractCreatedAt';
import { SellerContractVerified } from '../../domain/SellerContractVerified';
import { SellerContractOfficialDoc } from '../../domain/SellerContractOfficialDoc';
import { SellerContractFinancialDoc } from '../../domain/SellerContractFinancialDoc';
import { SellerContractUpdatedAt } from '../../domain/SellerContractUpdatedAt';
import { UserRecordUid } from '../../../UserRecord/domain/UserRecordUid';
import { SellerContractUserRecordNotFound } from '../../domain/SellerContractUserRecordNotFound';

export class SellerContractCreate {
    constructor(private userRecord: UserRecordRepository, private repository: SellerContractRepository) { }

    async run(
        uid: SellerContractUid,
        sellerUid: UserRecordUid,
        customerUid: UserRecordUid,
        serviceProviderUid: UserRecordUid,
        verified: SellerContractVerified,
        officialDoc: SellerContractOfficialDoc,
        financialDoc: SellerContractFinancialDoc,
        createdAt: SellerContractCreatedAt,
        updatedAt: SellerContractUpdatedAt):
        Promise<void> {

        const seller = await this.userRecord.profile(sellerUid);
        const customer = await this.userRecord.profile(customerUid);
        const serviceProvider = await this.userRecord.profile(serviceProviderUid);

        if (!seller || !customer || !serviceProvider) throw new SellerContractUserRecordNotFound();

        const contract = SellerContract.create(uid, seller, customer, serviceProvider, verified, officialDoc, financialDoc, updatedAt, createdAt);

        return await this.repository.create(contract);
    }
}