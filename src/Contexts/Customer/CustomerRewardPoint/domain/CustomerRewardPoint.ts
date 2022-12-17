import { CustomerRewardPointUid } from './CustomerRewardPointUid';
import { CustomerRewardPointTotal } from './CustomerRewardPointTotal';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';

export class CustomerRewardPoint extends AggregateRoot {
    readonly uid: CustomerRewardPointUid;
    private total: CustomerRewardPointTotal;

    constructor(uid: CustomerRewardPointUid, total: CustomerRewardPointTotal) {
        super();

        this.uid = uid;
        this.total = total;
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            total: this.total.value,
        };
    }

    static fromPrimitives(data: { uid: string; total: number; existingCourses: string[] }) {
        return new CustomerRewardPoint(
            new CustomerRewardPointUid(data.uid),
            new CustomerRewardPointTotal(data.total),
        );
    }
}