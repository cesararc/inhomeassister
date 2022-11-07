import { AuthenticationCookieCsrfToken } from "../domain/AuthenticationCookieCsrfToken";
import { AuthenticationCsrfToken } from "../domain/AuthenticationCsrfToken";
import { AuthenticationIdToken } from "../domain/AuthenticationIdToken";
import { AuthenticationRepository } from "../domain/AuthenticationRepository";
import { AuthenticationExpiresIn } from '../domain/AuthenticationExpiresIn';
import { AuthenticationForbidden } from "../domain/AuthenticationForbidden";
import { Authentication } from '../domain/Authentication';

type Params = {
    idToken: AuthenticationIdToken;
    csrfToken: AuthenticationCsrfToken;
    cookieCsrfToken: AuthenticationCookieCsrfToken;
}

export class AuthenticationCookieSessionCreate {
    constructor(private repository: AuthenticationRepository) { }

    async run({ csrfToken, cookieCsrfToken, idToken }: Params): Promise<{ cookieSession: string }> {

        if (csrfToken !== cookieCsrfToken) {
            throw new AuthenticationForbidden();
        }

        const authentication = Authentication.create({
            cookieCsrfToken,
            csrfToken,
            expiresIn: new AuthenticationExpiresIn(60 * 60 * 24 * 5 * 1000),
            idToken,
        });

        return await this.repository.cookieSessionCreate(authentication);
    }
}