import { Email } from '../../domain/Email';
import { EmailAddress } from '../../domain/EmailAddress';
import { EmailBody } from '../../domain/EmailBody';
import { EmailSubject } from '../../domain/EmailSubject';

export class EmailCustomerCreated extends Email {
    constructor(to: EmailAddress) {
        super({
            from: new EmailAddress('jmartin@inhomeassister.com'),
            to,
            subject: new EmailSubject('About my account'),
            body: new EmailBody('You just reated successfull')
        });
    }
}