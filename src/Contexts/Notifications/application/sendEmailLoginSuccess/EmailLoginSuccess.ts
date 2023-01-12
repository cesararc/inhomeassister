import { Email } from '../../domain/Email';
import { EmailAddress } from '../../domain/EmailAddress';
import { EmailBody } from '../../domain/EmailBody';
import { EmailSubject } from '../../domain/EmailSubject';

export class EmailLoginSuccess extends Email {
    constructor(to: EmailAddress) {
        super({
            from: new EmailAddress('jmartin@inhomeassister.com'),
            to,
            subject: new EmailSubject('Welcome'),
            body: new EmailBody('You just logged in')
        });
    }
}