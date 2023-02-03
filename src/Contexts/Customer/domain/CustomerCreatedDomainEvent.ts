import { DomainEvent } from "../../Shared/domain/DomainEvent";

type CustomerCreatedEventBody = {
    eventName: string;
    uid: string;
}

export class CustomerCreatedDomainEvent extends DomainEvent {
    static EVENT_NAME = 'customer.created';

    readonly uid: string;

    constructor({ uid }: { uid: string }) {
        super(CustomerCreatedDomainEvent.EVENT_NAME);

        this.uid = uid;
    }

    toPrimitive(): CustomerCreatedEventBody {
        return {
            eventName: CustomerCreatedDomainEvent.EVENT_NAME,
            uid: this.uid
        }
    }

    static fromPrimitives(body: CustomerCreatedEventBody): DomainEvent {
        return new CustomerCreatedDomainEvent({ uid: body.uid });
    }
}