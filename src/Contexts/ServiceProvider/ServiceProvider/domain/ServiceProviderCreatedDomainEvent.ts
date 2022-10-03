import { DomainEvent } from "../../../Shared/domain/DomainEvent";

type ServiceProviderCreatedEventBody = {
    eventName: string;
    email: string;
    uid: string;
}

export class ServiceProviderCreatedDomainEvent extends DomainEvent {
    static EVENT_NAME = 'ServiceProvider.created';

    readonly email: string;
    readonly uid: string;

    constructor({ email, uid }: { email: string, uid: string }) {
        super(ServiceProviderCreatedDomainEvent.EVENT_NAME);

        this.uid = uid;
        this.email = email;
    }

    toPrimitive(): ServiceProviderCreatedEventBody {
        return {
            email: this.email,
            eventName: ServiceProviderCreatedDomainEvent.EVENT_NAME,
            uid: this.uid
        }
    }
}