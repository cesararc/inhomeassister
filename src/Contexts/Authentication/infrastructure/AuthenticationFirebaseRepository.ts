import { auth } from '../../../Apps/database';
import { Authentication } from '../domain/Authentication';
import { AuthenticationRepository } from '../domain/AuthenticationRepository';


export class AuthenticationFirebaseRepository implements AuthenticationRepository {

    async cookieSessionCreate({ idToken, expiresIn }: Authentication) {
        await auth.verifyIdToken(idToken.value);

        return await auth.createSessionCookie(idToken.value, { expiresIn: expiresIn.value });
    }
}