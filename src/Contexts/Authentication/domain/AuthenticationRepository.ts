import { Authentication } from './Authentication';

export interface AuthenticationRepository {
    signIn(authentication: Authentication): Promise<string>;
}