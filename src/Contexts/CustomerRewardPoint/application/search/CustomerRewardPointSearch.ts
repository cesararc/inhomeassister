import { CustomerRewardPointRepository } from '../../domain/CustomerRewardPointRepository';
import { CustomerRewardPointUid } from '../../domain/CustomerRewardPointUid';
import { CustomerRewardPoint } from '../../domain/CustomerRewardPoint';
import { Nullable } from '../../../Shared/domain/Nullable';
import { CustomerRewardPointNotExist } from '../../domain/CustomerRewardPointNotExist';

export class CustomerRewardPointSearch {
    constructor(private repository: CustomerRewardPointRepository) { }

    async run(uid: CustomerRewardPointUid): Promise<Nullable<CustomerRewardPoint>> {
        const result = await this.repository.search(uid);
        if (!result) {
            throw new CustomerRewardPointNotExist();
        }

        return result;
    }
}