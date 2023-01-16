import { auth } from '../../../Apps/database';
import { Authentication } from '../domain/Authentication';
import { AuthenticationRepository } from '../domain/AuthenticationRepository';


export class AuthenticationFirebaseRepository implements AuthenticationRepository {
    async signIn({ idToken }: Authentication): Promise<string> {
        return await auth.createCustomToken(idToken.value, { premiumAccount: true });
    }

    async signOut(uid: string): Promise<void> {
        return await auth.revokeRefreshTokens(uid);
    }
}