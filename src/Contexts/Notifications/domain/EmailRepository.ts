import { Email } from "./Email";

export interface EmailRepository {
    send(email: Email): Promise<void>;
}