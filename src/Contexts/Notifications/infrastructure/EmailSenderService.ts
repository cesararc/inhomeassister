import { Email } from "../domain/Email";
import { EmailRepository } from "../domain/EmailRepository";

export class EmailSenderService implements EmailRepository {

    async send(email: Email): Promise<void> {
        console.log('Sending email to ', email);
    }
}