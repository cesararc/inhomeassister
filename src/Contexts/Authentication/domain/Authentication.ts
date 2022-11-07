import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { AuthenticationIdToken } from './AuthenticationIdToken';
import { AuthenticationExpiresIn } from './AuthenticationExpiresIn';
import { AuthenticationCsrfToken } from './AuthenticationCsrfToken';
import { AuthenticationCookieCsrfToken } from './AuthenticationCookieCsrfToken';

type Params = {
    idToken: AuthenticationIdToken;
    expiresIn: AuthenticationExpiresIn;
    csrfToken: AuthenticationCsrfToken;
    cookieCsrfToken: AuthenticationCookieCsrfToken;
}

export class Authentication extends AggregateRoot {
    idToken: AuthenticationIdToken;
    expiresIn: AuthenticationExpiresIn;
    csrfToken: AuthenticationCsrfToken;
    cookieCsrfToken: AuthenticationCookieCsrfToken;

    constructor(idToken: AuthenticationIdToken, expiresIn: AuthenticationExpiresIn, csrfToken: AuthenticationCsrfToken, cookieCsrfToken: AuthenticationCookieCsrfToken) {
        super();
        this.idToken = idToken;
        this.expiresIn = expiresIn;
        this.csrfToken = csrfToken;
        this.cookieCsrfToken = cookieCsrfToken;
    }

    static create({ idToken, expiresIn, csrfToken, cookieCsrfToken }: Params) {
        return new Authentication(idToken, expiresIn, csrfToken, cookieCsrfToken);
    }

    toPrimitives() {
        return {
            idToken: this.idToken.value,
            expireIn: this.expiresIn.value,
            csrfToken: this.csrfToken.value,
            cookieCsrfToken: this.cookieCsrfToken.value
        }
    }
}