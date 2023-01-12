import { EmailRepository } from '../../domain/EmailRepository';
import { EmailAddress } from '../../domain/EmailAddress';
import { EmailLoginSuccess } from './EmailLoginSuccess';

export class SendEmailLoginSuccess {
    constructor(private service: EmailRepository) { }

    async run(emailAddress: EmailAddress): Promise<void> {
        const email = new EmailLoginSuccess(emailAddress);
        await this.service.send(email);
    }
}