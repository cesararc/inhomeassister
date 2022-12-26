import { AuthenticationCookieCsrfToken } from "../domain/AuthenticationCookieCsrfToken";
import { AuthenticationCsrfToken } from "../domain/AuthenticationCsrfToken";
import { AuthenticationIdToken } from "../domain/AuthenticationIdToken";
import { AuthenticationRepository } from "../domain/AuthenticationRepository";
import { AuthenticationExpiresIn } from '../domain/AuthenticationExpiresIn';
import { AuthenticationForbidden } from "../domain/AuthenticationForbidden";
import { Authentication } from '../domain/Authentication';
import { AuthenticationEmailAddress } from '../domain/AuthenticationEmailAddress';
import { EventBus } from "../../Shared/domain/EventBus";

type Params = {
    idToken: AuthenticationIdToken;
    csrfToken: AuthenticationCsrfToken;
    cookieCsrfToken: AuthenticationCookieCsrfToken;
    email: AuthenticationEmailAddress;
}

export class AuthenticationCookieSessionCreate {
    constructor(private repository: AuthenticationRepository, private eventBus: EventBus) { }

    async run({ csrfToken, cookieCsrfToken, idToken, email }: Params): Promise<string> {

        if (csrfToken !== cookieCsrfToken) {
            throw new AuthenticationForbidden();
        }

        const authentication = Authentication.create({
            cookieCsrfToken,
            csrfToken,
            expiresIn: new AuthenticationExpiresIn(60 * 60 * 24 * 5 * 1000),
            idToken,
            email
        });

        const cookieSession = await this.repository.cookieSessionCreate(authentication);

        await this.eventBus.publish(authentication.pullDomainEvents());

        return cookieSession;
    }
}