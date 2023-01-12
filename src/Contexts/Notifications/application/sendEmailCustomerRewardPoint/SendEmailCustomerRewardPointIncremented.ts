import { EmailRepository } from '../../domain/EmailRepository';
import { EmailAddress } from '../../domain/EmailAddress';
import { EmailCustomerRewardPointIncremented } from './EmailCustomerRewardPointIncremented';

export class SendEmailCustomerRewardPointIncremented {
    constructor(private service: EmailRepository) { }

    async run(emailAddress: EmailAddress): Promise<void> {
        const email = new EmailCustomerRewardPointIncremented(emailAddress);
        await this.service.send(email);
    }
}