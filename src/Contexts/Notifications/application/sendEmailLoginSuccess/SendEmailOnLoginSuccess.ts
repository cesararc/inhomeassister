import { AuthenticationLoginDomainEvent } from "../../../Authentication/domain/AuthenticationLoginDomainEvent";
import { DomainEventSubscriber } from "../../../Shared/domain/DomainEventSubscriber";
import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { EmailAddress } from "../../domain/EmailAddress";
import { SendEmailLoginSuccess } from "./SendEmailLoginSuccess";

export class SendEmailOnLoginSuccess implements DomainEventSubscriber<AuthenticationLoginDomainEvent>{
    constructor(private sendEmail: SendEmailLoginSuccess) { }

    subscribedTo(): Array<DomainEventClass> {
        return [AuthenticationLoginDomainEvent]
    }

    async on(domainEvent: AuthenticationLoginDomainEvent): Promise<void> {
        await this.sendEmail.run(new EmailAddress(domainEvent.email));
    }

}