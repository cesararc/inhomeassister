
import { DomainEvent } from "../../Shared/domain/DomainEvent";

type ContractCreatedEventBody = {
    eventName: string;
    uid: string;
}

export class ContractCreatedDomainEvent extends DomainEvent {
    static EVENT_NAME = 'Contract.created';

    readonly uid: string;

    constructor({ uid }: { uid: string }) {
        super(ContractCreatedDomainEvent.EVENT_NAME);

        this.uid = uid;
    }

    toPrimitive(): ContractCreatedEventBody {
        return {
            eventName: ContractCreatedDomainEvent.EVENT_NAME,
            uid: this.uid
        }
    }
}