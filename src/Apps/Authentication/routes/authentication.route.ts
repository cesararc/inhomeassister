import { Router } from 'express';
import container from '../../dependency-injection';
import { isAuthenticated } from '../../middleware/isAuthenticated';

export const register = (router: Router) => {
    const SignIn = container.get('Authentication.AuthenticationSignInController');
    const SignOut = container.get('Authentication.AuthenticationSignOutController');

    router.post("/api/auth/sign-in", (...params) => SignIn.run(...params));
    router.post("/api/auth/sign-out/:uid", isAuthenticated, (...params) => SignOut.run(...params));
}