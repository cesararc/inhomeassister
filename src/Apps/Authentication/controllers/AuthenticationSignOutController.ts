import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Controller } from "../../controller/Controller";
import { AuthenticationSignOut } from '../../../Contexts/Authentication/application/AuthenticationSignOut';

export class AuthenticationSignOutController implements Controller {

    constructor(private auth: AuthenticationSignOut) { }

    async run(req: Request, res: Response) {
        const uid = req.params.uid;

        try {
            await this.auth.run(uid);

            res.status(httpStatus.OK).send();

        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).json(
                {
                    statusCode: httpStatus.BAD_REQUEST,
                    message: error.message
                }
            );
        }
    }
}