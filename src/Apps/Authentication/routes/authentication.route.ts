import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';

export const register = (router: Router) => {
    const signIn = container.get('Authentication.AuthenticationSignInController');
    const signOut = container.get('Authentication.AuthenticationSignOutController');

    router.post("/api/auth/sign-in", (...params) => signIn.run(...params));
    router.post("/api/auth/sign-out/:uid", isAuthenticated, (...params) => signOut.run(...params));
}