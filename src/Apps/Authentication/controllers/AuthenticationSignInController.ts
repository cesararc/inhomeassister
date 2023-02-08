import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from "../../controller/Controller";
import { AuthenticationSignIn } from '../../../Contexts/Authentication/application/AuthenticationSignIn';
import { AuthenticationForbidden } from '../../../Contexts/Authentication/domain/AuthenticationForbidden';
import { AuthenticationUserId } from '../../../Contexts/Authentication/domain/AuthenticationUserId';
import { AuthenticationEmailAddress } from "../../../Contexts/Authentication/domain/AuthenticationEmailAddress";
import { AuthenticationRole } from '../../../Contexts/Authentication/application/AuthenticationRole';
import { AuthenticationIdToken } from '../../../Contexts/Authentication/domain/AuthenticationIdToken';

export class AuthenticationSignInController implements Controller {

    constructor(private auth: AuthenticationSignIn, private role: AuthenticationRole) { }

    async run(req: Request, res: Response) {
        const userId = req.body.userId;
        const idToken = req.body.idToken;
        const email = req.body.email;

        try {
            const token = await this.auth.run(
                new AuthenticationUserId(userId),
                new AuthenticationEmailAddress(email)
            );

            const role = await this.role.run(new AuthenticationIdToken(idToken));

            return res.status(httpStatus.OK).json({ token, role });

        } catch (error) {
            if (error instanceof AuthenticationForbidden) {
                res.status(httpStatus.FORBIDDEN).json(
                    {
                        statusCode: httpStatus.FORBIDDEN,
                        message: error.message
                    }
                );
            }

            res.status(httpStatus.BAD_REQUEST).json(
                {
                    statusCode: httpStatus.BAD_REQUEST,
                    message: error.message
                }
            );
        }
    }
}