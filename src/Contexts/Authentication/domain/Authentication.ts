import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { AuthenticationUserId } from './AuthenticationUserId';
import { AuthenticationLoginDomainEvent } from './AuthenticationLoginDomainEvent';
import { AuthenticationEmailAddress } from './AuthenticationEmailAddress';

type Params = {
    userId: AuthenticationUserId;
    email: AuthenticationEmailAddress;
}

export class Authentication extends AggregateRoot {
    userId: AuthenticationUserId;
    email: AuthenticationEmailAddress;

    constructor(
        userId: AuthenticationUserId,
        email: AuthenticationEmailAddress) {
        super();
        this.userId = userId;
        this.email = email;
    }

    static create({ userId, email }: Params) {
        const auth = new Authentication(userId, email);

        auth.record(new AuthenticationLoginDomainEvent({ email: email.value }));

        return auth;
    }

    toPrimitives() {
        return {
            userId: this.userId.value,
            email: this.email.value
        }
    }
}