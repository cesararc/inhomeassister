import { CustomerRewardPoint } from './CustomerRewardPoint';
import { CustomerRewardPointUid } from './CustomerRewardPointUid';
import { Nullable } from '../../Shared/domain/Nullable';

export interface CustomerRewardPointRepository {
    search(uid: CustomerRewardPointUid): Promise<Nullable<CustomerRewardPoint>>;
    save(customerRewardPoint: CustomerRewardPoint): Promise<void>;
}