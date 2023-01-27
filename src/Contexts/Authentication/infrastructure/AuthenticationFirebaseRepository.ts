import { auth } from '../../../Apps/database';
import { Authentication } from '../domain/Authentication';
import { AuthenticationIdToken } from '../domain/AuthenticationIdToken';
import { AuthenticationRepository } from '../domain/AuthenticationRepository';


export class AuthenticationFirebaseRepository implements AuthenticationRepository {
    async signIn({ userId }: Authentication): Promise<string> {
        return await auth.createCustomToken(userId.value, { premiumAccount: true });
    }

    async signOut(uid: string): Promise<void> {
        return await auth.revokeRefreshTokens(uid);
    }

    async role(idToken: AuthenticationIdToken): Promise<string> {
        const decoded = await auth.verifyIdToken(idToken.value, true);

        return decoded.role;
    }
}