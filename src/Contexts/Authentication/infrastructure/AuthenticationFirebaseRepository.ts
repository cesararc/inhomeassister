import { auth } from '../../../Apps/database';
import { Authentication } from '../domain/Authentication';
import { AuthenticationRepository } from '../domain/AuthenticationRepository';


export class AuthenticationFirebaseRepository implements AuthenticationRepository {

    async signIn({ idToken }: Authentication) {
        return await auth.createCustomToken(idToken.value);
    }
}