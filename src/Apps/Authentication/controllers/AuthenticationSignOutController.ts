import { Controller } from "../../controller/Controller";
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export class AuthenticationSignOutController implements Controller {

    async run(req: Request, res: Response) {
        console.log("COOKIES", req.cookies);
        res.clearCookie("session");

        res.status(httpStatus.OK).send();
    }
}