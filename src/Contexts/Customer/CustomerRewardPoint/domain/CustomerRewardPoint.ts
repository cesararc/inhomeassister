import { CustomerRewardPointUid } from './CustomerRewardPointUid';
import { CustomerRewardPointAmount } from './CustomerRewardPointAmount';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';

export class CustomerRewardPoint extends AggregateRoot {
    readonly uid: CustomerRewardPointUid;
    amount: CustomerRewardPointAmount;

    constructor(uid: CustomerRewardPointUid, amount: CustomerRewardPointAmount) {
        super();

        this.uid = uid;
        this.amount = amount;
    }

    static initialize(uid: CustomerRewardPointUid, amount: CustomerRewardPointAmount) {
        return new CustomerRewardPoint(uid, CustomerRewardPointAmount.initialize(amount.value));
    }

    increment(amount: CustomerRewardPointAmount) {
        this.amount = this.amount.increment(amount.value)
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            amount: this.amount.value,
        };
    }

    static fromPrimitives(data: { uid: string; amount: number; }) {
        return new CustomerRewardPoint(
            new CustomerRewardPointUid(data.uid),
            new CustomerRewardPointAmount(data.amount),
        );
    }
}