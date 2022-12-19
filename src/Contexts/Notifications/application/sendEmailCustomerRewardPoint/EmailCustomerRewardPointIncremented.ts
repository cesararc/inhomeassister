import { Email } from '../../domain/Email';
import { EmailAddress } from '../../domain/EmailAddress';
import { EmailBody } from '../../domain/EmailBody';
import { EmailSubject } from '../../domain/EmailSubject';

export class EmailCustomerRewardPointIncremented extends Email {
    constructor(to: EmailAddress) {
        super({
            from: new EmailAddress('jmartin@inhomeassister.com'),
            to,
            subject: new EmailSubject('you have received score'),
            body: new EmailBody('you have received score')
        });
    }
}