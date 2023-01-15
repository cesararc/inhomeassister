import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Controller } from "../../controller/Controller";
import { AuthenticationSignIn } from '../../../Contexts/Authentication/application/AuthenticationSignIn';
import { AuthenticationForbidden } from '../../../Contexts/Authentication/domain/AuthenticationForbidden';
import { AuthenticationIdToken } from '../../../Contexts/Authentication/domain/AuthenticationIdToken';
import { AuthenticationEmailAddress } from "../../../Contexts/Authentication/domain/AuthenticationEmailAddress";

export class AuthenticationSignInController implements Controller {

    constructor(private auth: AuthenticationSignIn) { }

    async run(req: Request, res: Response) {
        try {
            const idToken = new AuthenticationIdToken(req.body.idToken);
            const email = new AuthenticationEmailAddress(req.body.email);

            const token = await this.auth.run(idToken, email);

            res.status(httpStatus.OK).json({ token });

        } catch (error) {
            if (error instanceof AuthenticationForbidden) {
                res.status(httpStatus.FORBIDDEN).send(error.message);
            }

            res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
    }
}