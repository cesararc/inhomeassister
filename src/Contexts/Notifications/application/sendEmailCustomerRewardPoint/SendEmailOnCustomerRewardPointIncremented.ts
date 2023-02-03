import { DomainEventSubscriber } from "../../../Shared/domain/DomainEventSubscriber";
import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { EmailAddress } from "../../domain/EmailAddress";
import { SendEmailCustomerRewardPointIncremented } from "./SendEmailCustomerRewardPointIncremented";
import { CustomerRewardPointIncrementedDomainEvent } from '../../../CustomerRewardPoint/domain/CustomerRewardPointIncrementedDomainEvent';

export class SendEmailOnCustomerRewardPointIncremented implements DomainEventSubscriber<CustomerRewardPointIncrementedDomainEvent>{
    constructor(private sendEmail: SendEmailCustomerRewardPointIncremented) { }

    subscribedTo(): Array<DomainEventClass> {
        return [CustomerRewardPointIncrementedDomainEvent]
    }

    async on(domainEvent: CustomerRewardPointIncrementedDomainEvent): Promise<void> {
        await this.sendEmail.run(new EmailAddress(domainEvent.uid));
    }

}