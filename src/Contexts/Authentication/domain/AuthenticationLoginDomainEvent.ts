import { DomainEvent } from '../../Shared/domain/DomainEvent';

type AuthenticationLoginEventBody = {
    eventName: string;
    email: string;
}

export class AuthenticationLoginDomainEvent extends DomainEvent {
    static EVENT_NAME = 'authentication.login';

    readonly email: string;

    constructor({ email }: { email: string }) {
        super(AuthenticationLoginDomainEvent.EVENT_NAME);

        this.email = email;
    }

    toPrimitive(): AuthenticationLoginEventBody {
        return {
            eventName: AuthenticationLoginDomainEvent.EVENT_NAME,
            email: this.email
        }
    }


    static fromPrimitives(body: AuthenticationLoginEventBody): DomainEvent {
        return new AuthenticationLoginDomainEvent({ email: body.email });
    }
}