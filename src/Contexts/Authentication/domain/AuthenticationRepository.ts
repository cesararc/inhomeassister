import { Authentication } from './Authentication';

export interface AuthenticationRepository {
    cookieSessionCreate(authentication: Authentication): Promise<string>;
}