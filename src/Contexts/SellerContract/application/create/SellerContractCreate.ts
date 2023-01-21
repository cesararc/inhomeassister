import { SellerContractRepository } from '../../domain/SellerContractRepository';
import { SellerContract } from '../../domain/SellerContract';
import { ContractDoc } from '../../domain/ContractDoc';
import { FinancialDoc } from '../../domain/FinancialDoc';
import { ServiceProviderUid } from '../../../ServiceProvider/domain/ServiceProviderUid';
import { CustomerUid } from '../../../Customer/Customer/domain/CustomerUid';
import { SellerUid } from '../../../Seller/domain/SellerUid';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';
import { SellerContractUid } from '../../domain/SellerContractUid';

export class SellerContractCreate {
    constructor(private userRecord: UserRecordRepository, private repository: SellerContractRepository) { }

    async run(uid: SellerContractUid, seller: SellerUid, customer: CustomerUid, serviceProvider: ServiceProviderUid, contractDoc: ContractDoc, financialDoc: FinancialDoc): Promise<void> {
        const contract = SellerContract.create(uid, seller, customer, serviceProvider, contractDoc, financialDoc);

        const profileResults = await this.userRecord.profileCollection([seller, customer, serviceProvider]);

        const profiles = profileResults.map(item => ({
            uid: item.uid.value,
            email: item.email.value,
            phone: item.phoneNumber.value,
            displayName: item.displayName.value,
            claim: item.claim.value
        }));

        const profilesMap = new Map(profiles.map((item) => [item.claim, item]));

        const documents = new Map(Object.entries(profilesMap));
        console.log(documents)
        // const sellerProfile = await this.userRecord.profile(seller);

        // const customerProfile = await this.userRecord.profile(customer);

        // const serviceProviderProfile = await this.userRecord.profile(serviceProvider);
        // email: userRecord.email.toString(),
        //     phone: userRecord.phoneNumber.toString(),
        //         displayName: userRecord.displayName.toString(),
        //             claim: userRecord.claim.value

        //console.log(responses);
        //return await this.repository.create(document);
    }
}