import { AuthenticationRepository } from "../domain/AuthenticationRepository";

export class AuthenticationSignOut {
    constructor(private repository: AuthenticationRepository) { }

    async run(uid: string): Promise<void> {
        return await this.repository.signOut(uid);
    }
}