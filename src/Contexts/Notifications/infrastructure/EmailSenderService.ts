import firestore from '../../../Apps/database';
import { Email } from "../domain/Email";
import { EmailRepository } from "../domain/EmailRepository";

export class EmailSenderService implements EmailRepository {

    protected collection() {
        return firestore.collection("mail");
    }

    async send(email: Email): Promise<void> {
        const doc = {
            to: email.to.value,
            message: {
                subject: email.subject.value,
                text: email.body.value
            },
        }

        const reference = await this.collection().add(doc);
        console.log(reference);
        console.log('Sending email to ', email);
    }
}