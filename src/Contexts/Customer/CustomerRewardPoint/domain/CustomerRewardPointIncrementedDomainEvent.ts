import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CustomerRewardPointIncrementedEventBody = {
    eventName: string;
    uid: string;
    amount: number;
}

export class CustomerRewardPointIncrementedDomainEvent extends DomainEvent {
    static EVENT_NAME = 'customerRewardPoint.incremented';

    readonly uid: string;
    readonly amount: number;

    constructor({ uid, amount }: { uid: string; amount: number }) {
        super(CustomerRewardPointIncrementedDomainEvent.EVENT_NAME);

        this.uid = uid;
    }

    toPrimitive(): CustomerRewardPointIncrementedEventBody {
        return {
            eventName: CustomerRewardPointIncrementedDomainEvent.EVENT_NAME,
            uid: this.uid,
            amount: this.amount
        }
    }

    static fromPrimitives(body: CustomerRewardPointIncrementedEventBody): DomainEvent {
        return new CustomerRewardPointIncrementedDomainEvent({ uid: body.uid, amount: body.amount });
    }

}