import { EmailRepository } from '../../domain/EmailRepository';
import { EmailCustomerCreated } from './EmailCustomerCreated';
import { UserRecordRepository } from '../../../UserRecord/domain/UserRecordRepository';
import { UserRecordUid } from '../../../UserRecord/domain/UserRecordUid';
import { EmailAddress } from '../../domain/EmailAddress';

export class SendEmailCustomerCreated {
    constructor(private userRecord: UserRecordRepository, private service: EmailRepository) { }

    async run(uid: UserRecordUid): Promise<void> {
        const profile = await this.userRecord.profile(uid);

        const email = new EmailCustomerCreated(new EmailAddress(profile.email.value));

        await this.service.send(email);
    }
}