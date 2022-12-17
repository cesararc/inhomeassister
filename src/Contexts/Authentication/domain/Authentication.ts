import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { AuthenticationIdToken } from './AuthenticationIdToken';
import { AuthenticationExpiresIn } from './AuthenticationExpiresIn';
import { AuthenticationCsrfToken } from './AuthenticationCsrfToken';
import { AuthenticationCookieCsrfToken } from './AuthenticationCookieCsrfToken';
import { AuthenticationLoginDomainEvent } from './AuthenticationLoginDomainEvent';
import { AuthenticationEmailAddress } from './AuthenticationEmailAddress';

type Params = {
    idToken: AuthenticationIdToken;
    expiresIn: AuthenticationExpiresIn;
    csrfToken: AuthenticationCsrfToken;
    cookieCsrfToken: AuthenticationCookieCsrfToken;
    email: AuthenticationEmailAddress;
}

export class Authentication extends AggregateRoot {
    idToken: AuthenticationIdToken;
    expiresIn: AuthenticationExpiresIn;
    csrfToken: AuthenticationCsrfToken;
    cookieCsrfToken: AuthenticationCookieCsrfToken;
    email: AuthenticationEmailAddress;

    constructor(idToken: AuthenticationIdToken, expiresIn: AuthenticationExpiresIn, csrfToken: AuthenticationCsrfToken, cookieCsrfToken: AuthenticationCookieCsrfToken, email: AuthenticationEmailAddress) {
        super();
        this.idToken = idToken;
        this.expiresIn = expiresIn;
        this.csrfToken = csrfToken;
        this.cookieCsrfToken = cookieCsrfToken;
        this.email = email;
    }

    static create({ idToken, expiresIn, csrfToken, cookieCsrfToken, email }: Params) {
        const auth = new Authentication(idToken, expiresIn, csrfToken, cookieCsrfToken, email);

        auth.record(new AuthenticationLoginDomainEvent({ email: email.value }));

        return auth;
    }

    toPrimitives() {
        return {
            idToken: this.idToken.value,
            expireIn: this.expiresIn.value,
            csrfToken: this.csrfToken.value,
            cookieCsrfToken: this.cookieCsrfToken.value,
            email: this.email.value
        }
    }
}