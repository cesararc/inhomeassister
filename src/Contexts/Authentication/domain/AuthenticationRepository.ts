import { Authentication } from './Authentication';

export interface AuthenticationRepository {
    signIn(authentication: Authentication): Promise<string>;
    signOut(uid: string): Promise<void>;
}