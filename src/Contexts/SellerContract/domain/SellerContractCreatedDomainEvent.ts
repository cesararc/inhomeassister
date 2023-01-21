
import { DomainEvent } from "../../Shared/domain/DomainEvent";

type SellerCreatedEventBody = {
    eventName: string;
    uid: string;
}

export class SellerContractCreatedDomainEvent extends DomainEvent {
    static EVENT_NAME = 'SellerContract.created';

    readonly uid: string;

    constructor({ uid }: { uid: string }) {
        super(SellerContractCreatedDomainEvent.EVENT_NAME);

        this.uid = uid;
    }

    toPrimitive(): SellerCreatedEventBody {
        return {
            eventName: SellerContractCreatedDomainEvent.EVENT_NAME,
            uid: this.uid
        }
    }
}