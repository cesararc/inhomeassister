import { DomainEvent } from "../../../Shared/domain/DomainEvent";

type ServiceProviderCreatedEventBody = {
    eventName: string;
    uid: string;
}

export class ServiceProviderCreatedDomainEvent extends DomainEvent {
    static EVENT_NAME = 'ServiceProvider.created';

    readonly uid: string;

    constructor({ uid }: { uid: string }) {
        super(ServiceProviderCreatedDomainEvent.EVENT_NAME);

        this.uid = uid;
    }

    toPrimitive(): ServiceProviderCreatedEventBody {
        return {
            eventName: ServiceProviderCreatedDomainEvent.EVENT_NAME,
            uid: this.uid
        }
    }

    static fromPrimitives(body: ServiceProviderCreatedEventBody): DomainEvent {
        return new ServiceProviderCreatedDomainEvent({
            uid: body.uid
        });
    }
}