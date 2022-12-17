import { EmailAddress } from './EmailAddress';
import { EmailSubject } from './EmailSubject';
import { EmailBody } from './EmailBody';

type ConstructorParams = {
    from: EmailAddress;
    to: EmailAddress;
    subject: EmailSubject;
    body: EmailBody;
}

export class Email {
    readonly from: EmailAddress;
    readonly to: EmailAddress;
    readonly subject: EmailSubject;
    readonly body: EmailBody;

    constructor(params: ConstructorParams) {
        this.from = params.from;
        this.to = params.to;
        this.subject = params.subject;
        this.body = params.body;
    }
}