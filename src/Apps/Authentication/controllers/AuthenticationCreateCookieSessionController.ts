import { Controller } from "../../controller/Controller";
import { CookieOptions, Request, Response } from 'express';
import { AuthenticationCookieSessionCreate } from '../../../Contexts/Authentication/application/AuthenticationCookieSessionCreate';
import { AuthenticationForbidden } from '../../../Contexts/Authentication/domain/AuthenticationForbidden';
import httpStatus from 'http-status';

export class AuthenticationCreateCookieSessionController implements Controller {

    constructor(private authentication: AuthenticationCookieSessionCreate) { }

    async run(req: Request, res: Response) {
        const idToken = req.body.idToken;
        const csrfToken = req.body.csrfToken;
        const cookieCsrfToken = req.cookies.csrfToken;
        const email = req.body.email;

        try {

            const { cookieSession } = await this.authentication.run({ idToken, csrfToken, cookieCsrfToken, email });

            const options: CookieOptions = {
                maxAge: 60 * 60 * 24 * 5 * 1000,
                httpOnly: true,
                secure: true
            };

            res.cookie('session', cookieSession, options);

            res.end(JSON.stringify({ status: 'success' }));

        } catch (error) {
            if (error instanceof AuthenticationForbidden) {
                res.status(httpStatus.FORBIDDEN).send();
            }

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
    }
}