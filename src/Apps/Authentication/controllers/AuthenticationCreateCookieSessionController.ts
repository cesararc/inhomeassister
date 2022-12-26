import { Controller } from "../../controller/Controller";
import { CookieOptions, Request, Response } from 'express';
import { AuthenticationCookieSessionCreate } from '../../../Contexts/Authentication/application/AuthenticationCookieSessionCreate';
import { AuthenticationForbidden } from '../../../Contexts/Authentication/domain/AuthenticationForbidden';
import { AuthenticationIdToken } from '../../../Contexts/Authentication/domain/AuthenticationIdToken';
import { AuthenticationEmailAddress } from "../../../Contexts/Authentication/domain/AuthenticationEmailAddress";
import { AuthenticationExpiresIn } from "../../../Contexts/Authentication/domain/AuthenticationExpiresIn";
import httpStatus from 'http-status';

export class AuthenticationCreateCookieSessionController implements Controller {

    constructor(private authentication: AuthenticationCookieSessionCreate) { }

    async run(req: Request, res: Response) {
        const cookieCsrfToken = req.cookies.csrfToken;
        const csrfToken = req.body.csrfToken;

        try {
            const idToken = new AuthenticationIdToken(req.body.idToken);
            const email = new AuthenticationEmailAddress(req.body.email);
            //const csrfToken = new AuthenticationCsrfToken(req.body.csrfToken);
            const cookieSession = await this.authentication.run({ idToken, csrfToken, cookieCsrfToken, email });

            const options: CookieOptions = {
                maxAge: AuthenticationExpiresIn.timeDuration(),
                httpOnly: true,
                secure: true
            };

            res.cookie('session', cookieSession, options);
            res.end(JSON.stringify({ status: 'success' }));

        } catch (error) {
            if (error instanceof AuthenticationForbidden) {
                res.status(httpStatus.FORBIDDEN).send(error.message);
            }

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
    }
}