import { Router, Request, Response } from 'express';
import container from '../../dependency-injection';

export const register = (router: Router) => {
    const authCookieSessionCreateController = container.get('Authentication.AuthenticationCreateCookieSessionController');
    const authSignOut = container.get('Authentication.AuthenticationSignOutController');

    router.post("/api/auth/sign-in", (req: Request, res: Response) => authCookieSessionCreateController.run(req, res));
    router.get("/api/auth/sign-out", (req: Request, res: Response) => authSignOut.run(req, res));
}