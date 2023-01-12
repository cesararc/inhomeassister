import { DomainEvent } from "../../Shared/domain/DomainEvent";

type SellerCreatedEventBody = {
    eventName: string;
    uid: string;
}

export class SellerCreatedDomainEvent extends DomainEvent {
    static EVENT_NAME = 'Seller.created';

    readonly uid: string;

    constructor({ uid }: { uid: string }) {
        super(SellerCreatedDomainEvent.EVENT_NAME);

        this.uid = uid;
    }

    toPrimitive(): SellerCreatedEventBody {
        return {
            eventName: SellerCreatedDomainEvent.EVENT_NAME,
            uid: this.uid
        }
    }
}