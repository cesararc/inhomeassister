import { AuthRepository } from '../../Shared/infrastructure/persistence/AuthRepository';
import { Authentication } from '../domain/Authentication';
import { AuthenticationRepository } from '../domain/AuthenticationRepository';


export class AuthenticationFirebaseRepository extends AuthRepository<Authentication> implements AuthenticationRepository {

    constructor() {
        super();
    }

    async cookieSessionCreate({ idToken, expiresIn }: Authentication) {
        const cookieSession = await this.authentication().createSessionCookie(idToken.value, { expiresIn: expiresIn.value });

        return { cookieSession };
    }
}