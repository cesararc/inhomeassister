import { DomainEventSubscriber } from '../../../Shared/domain/DomainEventSubscriber';
import { UserRecordDisable } from './UserRecordDisable';
import { ServiceProviderCreatedDomainEvent } from '../../../ServiceProvider/ServiceProvider/domain/ServiceProviderCreatedDomainEvent';
import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { UserRecordUid } from '../../domain/UserRecordUid';

export class UserRecordDisableOnServiceProviderCreated implements DomainEventSubscriber<ServiceProviderCreatedDomainEvent>{
    constructor(private userRecordDisable: UserRecordDisable) { }

    subscribedTo(): Array<DomainEventClass> {
        return [ServiceProviderCreatedDomainEvent]
    }

    async on(domainEvent: ServiceProviderCreatedDomainEvent): Promise<void> {
        const uid = new UserRecordUid(domainEvent.uid);
        await this.userRecordDisable.run(uid);
    }

}