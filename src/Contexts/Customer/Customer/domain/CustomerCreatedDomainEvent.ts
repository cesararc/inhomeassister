import { DomainEvent } from "../../../Shared/domain/DomainEvent";

type CustomerCreatedEventBody = {
    eventName: string;
    email: string;
    uid: string;
}

export class CustomerCreatedDomainEvent extends DomainEvent {
    static EVENT_NAME = 'customer.created';

    readonly email: string;
    readonly uid: string;

    constructor({ email, uid }: { email: string, uid: string }) {
        super(CustomerCreatedDomainEvent.EVENT_NAME);

        this.uid = uid;
        this.email = email;
    }

    toPrimitive(): CustomerCreatedEventBody {
        return {
            email: this.email,
            eventName: CustomerCreatedDomainEvent.EVENT_NAME,
            uid: this.uid
        }
    }
}