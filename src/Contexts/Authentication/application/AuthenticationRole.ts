import { AuthenticationRepository } from '../domain/AuthenticationRepository';
import { AuthenticationIdToken } from '../domain/AuthenticationIdToken';

export class AuthenticationRole {
    constructor(private auth: AuthenticationRepository) { }

    async run(idToken: AuthenticationIdToken): Promise<string> {
        return await this.auth.role(idToken);
    }
}