import { CustomerRewardPointUid } from './CustomerRewardPointUid';
import { CustomerRewardPointAmount } from './CustomerRewardPointAmount';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';

export class CustomerRewardPoint extends AggregateRoot {
    readonly uid: CustomerRewardPointUid;
    readonly amount: CustomerRewardPointAmount;

    constructor(uid: CustomerRewardPointUid, amount: CustomerRewardPointAmount) {
        super();

        this.uid = uid;
        this.amount = amount;
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            total: this.amount.value,
        };
    }

    static fromPrimitives(data: { uid: string; amount: number; }) {
        return new CustomerRewardPoint(
            new CustomerRewardPointUid(data.uid),
            new CustomerRewardPointAmount(data.amount),
        );
    }
}