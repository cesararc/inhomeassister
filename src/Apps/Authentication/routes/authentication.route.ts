import { Router } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {
    const signIn = container.get('Authentication.AuthenticationCreateCookieSessionController');
    const signOut = container.get('Authentication.AuthenticationSignOutController');

    router.post("/api/auth/sign-in", (...params) => signIn.run(...params));
    router.post("/api/auth/sign-out", (...params) => signOut.run(...params));
}