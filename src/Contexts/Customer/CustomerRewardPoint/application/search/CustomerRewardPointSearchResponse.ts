import { CustomerRewardPoint } from '../../domain/CustomerRewardPoint';

export class CustomerRewardPointSearchResponse {
    customerRewardPoint: CustomerRewardPoint;

    constructor(customerRewardPoint: CustomerRewardPoint) {
        this.customerRewardPoint = customerRewardPoint;
    }
}