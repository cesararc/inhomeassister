import { AuthenticationIdToken } from "../domain/AuthenticationIdToken";
import { AuthenticationRepository } from "../domain/AuthenticationRepository";
import { Authentication } from '../domain/Authentication';
import { AuthenticationEmailAddress } from '../domain/AuthenticationEmailAddress';
import { EventBus } from "../../Shared/domain/EventBus";

type Params = {
    idToken: AuthenticationIdToken;
    email: AuthenticationEmailAddress;
}

export class AuthenticationSignIn {
    constructor(private repository: AuthenticationRepository, private eventBus: EventBus) { }

    async run({ idToken, email }: Params): Promise<string> {
        const authentication = Authentication.create({ idToken, email });
        const cookieSession = await this.repository.signIn(authentication);

        await this.eventBus.publish(authentication.pullDomainEvents());

        return cookieSession;
    }
}