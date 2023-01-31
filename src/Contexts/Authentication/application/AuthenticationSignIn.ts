import { AuthenticationUserId } from "../domain/AuthenticationUserId";
import { AuthenticationRepository } from "../domain/AuthenticationRepository";
import { Authentication } from '../domain/Authentication';
import { AuthenticationEmailAddress } from '../domain/AuthenticationEmailAddress';
import { EventBus } from "../../Shared/domain/EventBus";

export class AuthenticationSignIn {
    constructor(private repository: AuthenticationRepository, private eventBus: EventBus) { }

    async run(userId: AuthenticationUserId, email: AuthenticationEmailAddress): Promise<string> {
        const authentication = Authentication.create({ userId, email });
        const cookieSession = await this.repository.signIn(authentication);

        await this.eventBus.publish(authentication.pullDomainEvents());

        return cookieSession;
    }
}