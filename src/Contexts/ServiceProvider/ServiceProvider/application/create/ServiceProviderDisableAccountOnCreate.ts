import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { UserRecordDisable } from '../../../../UserRecord/application/accountDisable/UserRecordDisable';
import { ServiceProviderCreatedDomainEvent } from '../../domain/ServiceProviderCreatedDomainEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { UserRecordUid } from '../../../../UserRecord/domain/UserRecordUid';

export class ServiceProviderDisableAccountOnCreate implements DomainEventSubscriber<ServiceProviderCreatedDomainEvent>{
    constructor(private userRecordDisable: UserRecordDisable) { }

    subscribedTo(): Array<DomainEventClass> {
        return [ServiceProviderCreatedDomainEvent]
    }

    async on(domainEvent: ServiceProviderCreatedDomainEvent): Promise<void> {
        const uid = new UserRecordUid(domainEvent.uid);
        await this.userRecordDisable.run(uid);
    }

}