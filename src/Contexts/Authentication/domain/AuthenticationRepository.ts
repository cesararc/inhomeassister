import { Authentication } from './Authentication';
import { AuthenticationIdToken } from './AuthenticationIdToken';

export interface AuthenticationRepository {
    signIn(authentication: Authentication): Promise<string>;
    signOut(uid: string): Promise<void>;
    role(idToken: AuthenticationIdToken): Promise<string>;
}