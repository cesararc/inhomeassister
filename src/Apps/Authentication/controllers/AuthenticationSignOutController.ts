import { Controller } from "../../controller/Controller";
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export class AuthenticationSignOutController implements Controller {

    async run(_: Request, res: Response) {
        res.clearCookie("session");

        res.status(httpStatus.OK).send();
    }
}