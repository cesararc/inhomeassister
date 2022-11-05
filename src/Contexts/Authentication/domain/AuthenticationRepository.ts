
export interface AuthenticationRepository {
    signIn(): Promise<void>;
    signOut(): Promise<void>;
}