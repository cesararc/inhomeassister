import { DomainEvent } from "../../../Shared/domain/DomainEvent";

type SellerCreatedEventBody = {
    eventName: string;
    email: string;
    uid: string;
}

export class SellerCreatedDomainEvent extends DomainEvent {
    static EVENT_NAME = 'Seller.created';

    readonly email: string;
    readonly uid: string;

    constructor({ email, uid }: { email: string, uid: string }) {
        super(SellerCreatedDomainEvent.EVENT_NAME);

        this.uid = uid;
        this.email = email;
    }

    toPrimitive(): SellerCreatedEventBody {
        return {
            email: this.email,
            eventName: SellerCreatedDomainEvent.EVENT_NAME,
            uid: this.uid
        }
    }
}