import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { AuthenticationIdToken } from './AuthenticationIdToken';
import { AuthenticationLoginDomainEvent } from './AuthenticationLoginDomainEvent';
import { AuthenticationEmailAddress } from './AuthenticationEmailAddress';

type Params = {
    idToken: AuthenticationIdToken;
    email: AuthenticationEmailAddress;
}

export class Authentication extends AggregateRoot {
    idToken: AuthenticationIdToken;
    email: AuthenticationEmailAddress;

    constructor(
        idToken: AuthenticationIdToken,
        email: AuthenticationEmailAddress) {
        super();
        this.idToken = idToken;
        this.email = email;
    }

    static create({ idToken, email }: Params) {
        const auth = new Authentication(idToken, email);

        auth.record(new AuthenticationLoginDomainEvent({ email: email.value }));

        return auth;
    }

    toPrimitives() {
        return {
            idToken: this.idToken.value,
            email: this.email.value
        }
    }
}