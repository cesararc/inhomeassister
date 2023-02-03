import { DomainEventSubscriber } from "../../../Shared/domain/DomainEventSubscriber";
import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { SendEmailCustomerCreated } from './SendEmailCustomerCreated';
import { CustomerCreatedDomainEvent } from "../../../Customer/domain/CustomerCreatedDomainEvent";
import { UserRecordUid } from '../../../UserRecord/domain/UserRecordUid';

export class SendEmailOnCustomerCreated implements DomainEventSubscriber<CustomerCreatedDomainEvent>{
    constructor(private sendEmail: SendEmailCustomerCreated) { }

    subscribedTo(): Array<DomainEventClass> {
        return [CustomerCreatedDomainEvent]
    }

    async on(domainEvent: CustomerCreatedDomainEvent): Promise<void> {
        await this.sendEmail.run(new UserRecordUid(domainEvent.uid));
    }

}