import { CustomerRewardPoint } from './CustomerRewardPoint';

export interface CustomerRewardPointRepository {
    search(): Promise<CustomerRewardPoint>;
    save(counter: CustomerRewardPoint): Promise<void>;
}